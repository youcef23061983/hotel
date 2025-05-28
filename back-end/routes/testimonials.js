const express = require("express");
const pool = require("../libs/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const testimonials = await pool.query("SELECT * FROM testimonials");
    res.json(testimonials.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
