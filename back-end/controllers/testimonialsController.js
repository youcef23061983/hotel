require("dotenv").config();
const pool = require("../libs/db.js");

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await pool.query("SELECT * FROM testimonials");
    res.json(testimonials.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getTestimonials;
