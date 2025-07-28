// const pool = require("../libs/db.js");

// const saveOrderToDatabase = async (orderData) => {
//   let client; // ✅ Declare client at the top

//   const {
//     room_id,
//     tbluser_id,
//     arrival,
//     departure,
//     dates,
//     price,
//     total,
//     title,
//     firstname,
//     lastname,
//     countrycode,
//     phonenumber,
//     email,
//     country,
//     city,
//     nationality,
//     termscondition,
//     payment,
//     emailme,
//     room,
//   } = orderData;

//   const pgDatesArray = dates.map(
//     (d) => new Date(d).toLocaleDateString("en-CA") // "YYYY-MM-DD"
//   );

//   try {
//     client = await pool.connect(); // ✅ no `const`
//     console.log("📅 saveOrder dates:", dates);
//     console.log("🐘 saveOrder PG dates:", pgDatesArray);

//     // ✅ Start a transaction
//     await client.query("BEGIN");

//     // 1. Insert into orders
//     const orderRes = await client.query(
//       `INSERT INTO bookings (
//     room_id,
//     tbluser_id,
//     arrival,
//     departure,
//     dates,
//     price,
//     total,
//     title,
//     firstname,
//     lastname,
//     countrycode,
//     phonenumber,
//     email,
//     country,
//     city,
//     nationality,
//     termscondition,
//     payment,
//     emailme
//   ) VALUES (
//     $1, $2, $3, $4, $5::DATE[],
//     $6, $7, $8, $9, $10, $11,
//     $12, $13, $14, $15, $16,
//     $17, $18, $19
//   ) RETURNING id`,
//       [
//         room_id,
//         tbluser_id,
//         arrival,
//         departure,
//         pgDatesArray,
//         price,
//         total,
//         title,
//         firstname,
//         lastname,
//         countrycode,
//         phonenumber,
//         email,
//         country,
//         city,
//         nationality,
//         termscondition,
//         payment,
//         emailme,
//       ]
//     );

//     // ✅ Commit if all successful
//     await client.query("COMMIT");

//     return {
//       success: true,
//       bookingId: orderRes.rows[0].id,
//     };
//   } catch (error) {
//     if (client) await client.query("ROLLBACK");
//     throw error;
//   } finally {
//     if (client) client.release(); // ✅ safe now
//   }
// };
// module.exports = saveOrderToDatabase;

const pool = require("../libs/db.js");

const saveOrderToDatabase = async (orderData) => {
  let client;

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

  // Modified date handling - UTC-safe conversion
  // const pgDatesArray = dates.map((d) => {
  //   const date = new Date(d);
  //   return [
  //     date.getUTCFullYear(),
  //     String(date.getUTCMonth() + 1).padStart(2, "0"),
  //     String(date.getUTCDate()).padStart(2, "0"),
  //   ].join("-");
  // });
  const pgDatesArray = dates.map((d) => {
    // Parse MM/DD/YYYY into a UTC date string (YYYY-MM-DD)
    const [month, day, year] = d.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  });

  try {
    client = await pool.connect();
    console.log("📅 saveOrder dates:", dates);
    console.log("🐘 saveOrder PG dates (UTC-safe):", pgDatesArray);

    await client.query("BEGIN");

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
    $1, $2, $3::DATE, $4::DATE, $5::DATE[],
    $6, $7, $8, $9, $10, $11,
    $12, $13, $14, $15, $16,
    $17, $18, $19
  ) RETURNING id`,
      [
        room_id,
        tbluser_id,
        arrival, // Format: "MM/DD/YYYY" (from frontend)
        departure, // Format: "MM/DD/YYYY" (from frontend)
        pgDatesArray, // Format: ["YYYY-MM-DD", ...] (UTC-converted)
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

    await client.query("COMMIT");

    return {
      success: true,
      bookingId: orderRes.rows[0].id,
    };
  } catch (error) {
    if (client) await client.query("ROLLBACK");
    throw error;
  } finally {
    if (client) client.release();
  }
};

module.exports = saveOrderToDatabase;
