const pool = require("../libs/db.js");

const patchUnavailables = async (unavailableOrder) => {
  let client; // ✅ Declare client at the top

  const { unavailables, id } = unavailableOrder;

  try {
    client = await pool.connect(); // ✅ no `const`
    console.log("📅 fn unavailables dates:", unavailables);

    // ✅ Start a transaction
    await client.query("BEGIN");
    const result = await client.query(
      `UPDATE rooms
       SET unavailables = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [unavailables, id]
    );

    // ✅ Commit if all successful
    await client.query("COMMIT");

    if (result.rowCount === 0) {
      throw new Error("Room not found");
    }
    return {
      success: true,
      result: result.rows[0],
    };
  } catch (error) {
    if (client) await client.query("ROLLBACK");
    throw error;
  } finally {
    if (client) client.release(); // ✅ safe now
  }
};
module.exports = patchUnavailables;
