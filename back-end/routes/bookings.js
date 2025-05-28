const express = require("express");
const pool = require("../libs/db.js");

const router = express.Router();

// GET all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await pool.query("SELECT * FROM bookings");
    res.json(bookings.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single booking by ID:

router.post("/", async (req, res) => {
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
    creditCardNumber,
    expirationMonth,
    year,
    securityCode,
    nameHolder,
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
        creditCardNumber,
        expirationMonth,
        year,
        securityCode,
        nameHolder,
        termsCondition,
        emailMe
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18,
        $19, $20, $21, $22
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
        creditCardNumber,
        expirationMonth,
        year,
        securityCode,
        nameHolder,
        termsCondition,
        emailMe,
      ]
    );

    res.status(201).json(newBooking.rows[0]); // returns booking with its id
  } catch (err) {
    console.error("Booking insertion error:", err.message);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

module.exports = router;
