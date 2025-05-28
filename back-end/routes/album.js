const express = require("express");
const pool = require("../libs/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const album = await pool.query("SELECT * FROM album");
    res.json(album.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
