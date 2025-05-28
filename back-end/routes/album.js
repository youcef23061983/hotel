require("dotenv").config();
const getAlbum = require("../controllers/albumController.js");

const express = require("express");

const router = express.Router();

router.get("/", getAlbum);

module.exports = router;
