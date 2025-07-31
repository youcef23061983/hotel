require("dotenv").config();
const pool = require("../libs/db.js");

const getOrder = async (req, res) => {
  try {
    const { sessionId } = req.query;

    // 1. Get all booking data in one query
    const result = await pool.query(
      `SELECT * FROM bookings WHERE transaction_id = $1`,
      [sessionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // 2. Return the complete booking record as-is
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
module.exports = getOrder;
