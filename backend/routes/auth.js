const jwt = require("jsonwebtoken");
const pool = require("../db");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    const userResult = await pool.query(
      "SELECT id, status FROM users WHERE id = $1",
      [req.userId]
    );
    const user = userResult.rows[0];

    if (!user) return res.status(401).json({ error: "User not found" });
    if (user.status === "blocked")
      return res.status(403).json({ error: "User blocked" });

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
module.exports = { authenticate };
