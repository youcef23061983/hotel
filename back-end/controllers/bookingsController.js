require("dotenv").config();

const pool = require("../libs/db.js");

const getBookings = async (req, res) => {
  try {
    const bookings = await pool.query("SELECT * FROM bookings");
    res.json(bookings.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const potBooking = async (req, res) => {
  const {
    room_id,
    arrival,
    departure,
    dates,
    price,
    total,
    title,
    firstName,
    lastName,
    countryCode,
    phoneNumber,
    email,
    country,
    city,
    nationality,
    payment,
    termsCondition,
    emailMe,
  } = req.body;

  try {
    const newBooking = await pool.query(
      `INSERT INTO bookings (
        room_id,
        arrival,
        departure,
        dates,
        price,
        total,
        title,
        firstName,
        lastName,
        countryCode,
        phoneNumber,
        email,
        country,
        city,
        nationality,
        payment,
        termsCondition,
        emailMe
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17,$18
      ) RETURNING *`,
      [
        room_id,
        arrival,
        departure,
        dates,
        price,
        total,
        title,
        firstName,
        lastName,
        countryCode,
        phoneNumber,
        email,
        country,
        city,
        nationality,
        payment,
        termsCondition,
        emailMe,
      ]
    );

    res.status(201).json(newBooking.rows[0]); // returns booking with its id
  } catch (err) {
    console.error("Booking insertion error:", err.message);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

module.exports = { getBookings, potBooking };
