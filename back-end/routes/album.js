require("dotenv").config();
const getAlbum = require("../controllers/getAlbum.js");

const express = require("express");

const router = express.Router();

router.get("/", getAlbum);

module.exports = router;
