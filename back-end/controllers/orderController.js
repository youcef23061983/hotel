require("dotenv").config();
const pool = require("../libs/db.js");

const getOrder = async (req, res) => {
  try {
    const { session_id } = req.query; // Note: Changed from sessionId to session_id
    console.log(`Looking up booking with identifier: ${session_id}`);

    if (!session_id) {
      return res.status(400).json({
        error: "Missing parameter",
        message: "session_id query parameter is required",
      });
    }

    // First try with the session_id as transaction_id
    let result = await pool.query(
      `SELECT * FROM bookings WHERE transaction_id = $1`,
      [session_id]
    );

    // If not found, check if it's a checkout session ID
    if (result.rows.length === 0) {
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(session_id);

      result = await pool.query(
        `SELECT * FROM bookings WHERE transaction_id = $1`,
        [session.payment_intent] // Use payment intent ID instead
      );
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Booking not found",
        message: "No booking found with the provided reference",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
module.exports = getOrder;
