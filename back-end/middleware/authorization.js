require("dotenv").config();
const jwt = require("jsonwebtoken");
const pool = require("../libs/db");
const authorization = async (req, res, next) => {
  try {
    const authHeader = req?.headers?.authorization;

    if (!authHeader || !authHeader?.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ status: "auth_failed", message: "Authentication failed" });
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Query the database to find the user
    const userResult = await pool.query(
      "SELECT id, username, email,user_role,firebase_uid FROM tbluser WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // Attach user information to the request object
    req.user = userResult.rows[0];
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    return res
      .status(403)
      .json({ message: "Forbidden - Invalid or expired token" });
  }
};

module.exports = { authorization };
