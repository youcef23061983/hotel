const pool = require("../libs/db.js");

const saveOrderToDatabase = async (orderData) => {
  let client; // ✅ Declare client at the top

  const {
    room_id,
    tbluser_id,
    arrival,
    departure,
    dates,
    price,
    total,
    title,
    firstname,
    lastname,
    countrycode,
    phonenumber,
    email,
    country,
    city,
    nationality,
    termscondition,
    payment,
    emailme,
    room,
  } = orderData;
  // const pgDatesArray = dates.map((d) => {
  //   const date = new Date(d);
  //   const utcDate = new Date(
  //     Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  //   );
  //   return utcDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
  // });

  // const formatDate = (d) => {
  //   const date = new Date(d);
  //   return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
  //     2,
  //     "0"
  //   )}-${String(date.getDate()).padStart(2, "0")}`;
  // };

  // const pgDatesArray = dates.map(formatDate);

  try {
    client = await pool.connect(); // ✅ no `const`
    console.log("📅 saveOrder dates:", dates);
    // console.log("🐘 saveOrder PG dates:", pgDatesArray);

    // ✅ Start a transaction
    await client.query("BEGIN");

    // 1. Insert into orders
    const orderRes = await client.query(
      `INSERT INTO bookings (
    room_id,
    tbluser_id,
    arrival,
    departure,
    dates,
    price,
    total,
    title,
    firstname,
    lastname,
    countrycode,
    phonenumber,
    email,
    country,
    city,
    nationality,
    termscondition,
    payment,
    emailme
  ) VALUES (
    $1, $2, $3, $4, $5::DATE[],
    $6, $7, $8, $9, $10, $11,
    $12, $13, $14, $15, $16,
    $17, $18, $19
  ) RETURNING id`,
      [
        room_id,
        tbluser_id,
        arrival,
        departure,
        dates,
        price,
        total,
        title,
        firstname,
        lastname,
        countrycode,
        phonenumber,
        email,
        country,
        city,
        nationality,
        termscondition,
        payment,
        emailme,
      ]
    );

    // ✅ Commit if all successful
    await client.query("COMMIT");

    return {
      success: true,
      bookingId: orderRes.rows[0].id,
    };
  } catch (error) {
    if (client) await client.query("ROLLBACK");
    throw error;
  } finally {
    if (client) client.release(); // ✅ safe now
  }
};
module.exports = saveOrderToDatabase;
