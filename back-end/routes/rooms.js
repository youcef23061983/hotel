const express = require("express");
const {
  getRooms,
  getSingleRoom,
  patchUnavailables,
} = require("../controllers/roomsController");

const router = express.Router();

// get all rooms or suites:
// GET /api/rooms - returns all rooms and suites
router.get("/", getRooms);

// get a single room or  suite:
router.get("/:id", getSingleRoom);

// PATCH /api/rooms/:id - update unavailables for a room
router.patch("/:id", patchUnavailables);

module.exports = router;
