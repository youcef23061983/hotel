const express = require("express");
const getTestimonials = require("../controllers/testimonialsController.js");

const router = express.Router();

router.get("/", getTestimonials);

module.exports = router;
