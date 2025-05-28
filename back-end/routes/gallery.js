const express = require("express");

const router = express.Router();
const getGallery = require("../controllers/galleryController.js");

router.get("/", getGallery);

module.exports = router;
