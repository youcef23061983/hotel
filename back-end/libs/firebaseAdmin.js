require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.SERVICEACCOUNT); // ✅ fixed name

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
