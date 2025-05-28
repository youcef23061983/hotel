const express = require("express");

const router = express.Router();
const {
  getBookings,
  potBooking,
} = require("../controllers/bookingsController.js");

// GET all bookings
router.get("/", getBookings);

// GET a single booking by ID:

router.post("/", potBooking);

module.exports = router;
