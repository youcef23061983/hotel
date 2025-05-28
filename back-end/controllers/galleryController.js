require("dotenv").config();
const pool = require("../libs/db.js");

const getGallery = async (req, res) => {
  try {
    const gallery = await pool.query("SELECT * FROM gallery");
    res.json(gallery.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getGallery;
