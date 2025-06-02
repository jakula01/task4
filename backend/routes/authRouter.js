const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();
const { authenticate } = require("./auth");
const router = express.Router();

router.post("/logout", authenticate, async (req, res) => {
  try {
    await pool.query("UPDATE users SET last_seen = NOW() WHERE id = $1", [
      req.userId,
    ]);
    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ error: "Logout failed" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password, name, company } = req.body;

  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "The user already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const userIndex = require("crypto").randomUUID();
    const newUser = await pool.query(
      "INSERT INTO users (email, password, user_index, name, company, last_seen) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id, email, user_index, name, company",
      [email, hashedPassword, userIndex, name, company]
    );
    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ user: newUser.rows[0], token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const user = userResult.rows[0];
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });
    if (user.status === "blocked") {
      return res.status(403).json({ error: "User blocked" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });
    await pool.query("UPDATE users SET last_seen = NOW() WHERE id = $1", [
      user.id,
    ]);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        user_index: user.user_index,
        last_seen: new Date(),
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
