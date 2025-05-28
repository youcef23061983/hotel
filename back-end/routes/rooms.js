const express = require("express");
const pool = require("../libs/db.js");

const router = express.Router();

// get all rooms or suites:
// GET /api/rooms - returns all rooms and suites
router.get("/", async (req, res) => {
  try {
    const rooms = await pool.query(`
      SELECT 
        r.*,
        json_build_object(
          'number', rs.number,
          'icon', rs.icon
        ) AS room_square_footage,
        json_build_object(
          'number', c.number,
          'icon', c.icon
        ) AS capacity,
        json_build_object(
          'number', bn.number,
          'icon', bn.icon
        ) AS bath_number,
        COALESCE(
          (
            SELECT json_agg(json_build_object('name', a.name, 'icon', a.icon))
            FROM amenities a
            JOIN room_amenities ra ON a.id = ra.amenity_id
            WHERE ra.room_id = r.id
          ),
          '[]'::json
        ) AS amenities
      FROM rooms r
      LEFT JOIN room_square_footage rs ON r.id = rs.room_id
      LEFT JOIN capacity c ON r.id = c.room_id
      LEFT JOIN bath_number bn ON r.id = bn.room_id
      ORDER BY r.id
    `);

    res.json(rooms.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get a single room or  suite:
router.get("/:id", async (req, res) => {
  try {
    // Get the room
    const room = await pool.query("SELECT * FROM rooms WHERE id = $1", [
      req.params.id,
    ]);

    // Get related data
    const [squareFootage, capacity, bathNumber, amenities] = await Promise.all([
      pool.query("SELECT * FROM room_square_footage WHERE room_id = $1", [
        req.params.id,
      ]),
      pool.query("SELECT * FROM capacity WHERE room_id = $1", [req.params.id]),
      pool.query("SELECT * FROM bath_number WHERE room_id = $1", [
        req.params.id,
      ]),
      pool.query(
        `
        SELECT a.name, a.icon 
        FROM amenities a
        JOIN room_amenities ra ON a.id = ra.amenity_id
        WHERE ra.room_id = $1
      `,
        [req.params.id]
      ),
    ]);

    // Combine all data
    const response = {
      ...room.rows[0],
      room_square_footage: squareFootage.rows[0] || { number: 0, icon: "" },
      capacity: capacity.rows[0] || { number: 0, icon: "" },
      bath_number: bathNumber.rows[0] || { number: 0, icon: "" },
      amenities: amenities.rows,
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/rooms/:id - update unavailables for a room
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { unavailables } = req.body;

  if (!Array.isArray(unavailables)) {
    return res
      .status(400)
      .json({ error: "Invalid or missing 'unavailables' array" });
  }

  try {
    const result = await pool.query(
      `UPDATE rooms
       SET unavailables = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [unavailables, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("PATCH /rooms/:id error:", err.message);
    res.status(500).json({ error: "Failed to update room unavailables" });
  }
});

module.exports = router;
