const express = require("express");
const getOrder = require("../controllers/orderController");

const router = express.Router();

router.get("/", getOrder);

module.exports = router;
