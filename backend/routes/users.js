const express = require("express");
const router = express.Router();
const pool = require("../db");
const { authenticate } = require("./auth");
router.get("/get", authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, last_seen, company, status FROM users"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Userlist offer server error" });
  }
});
router.post("/delete", authenticate, async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ error: "User IDs for deletion have not been transferred" });
  }

  try {
    await pool.query("DELETE FROM users WHERE id = ANY($1)", [ids]);
    res.status(200).json({ message: "Users deleted" });
  } catch (err) {
    console.error("Error when deleting users:", err);
    res.status(500).json({ error: "Server error when deleting users" });
  }
});

router.post("/update-status", authenticate, async (req, res) => {
  const { ids, status } = req.body;

  if (
    !Array.isArray(ids) ||
    ids.length === 0 ||
    !["active", "blocked"].includes(status)
  ) {
    return res.status(400).json({ error: "Incorrect data for status update" });
  }

  try {
    await pool.query("UPDATE users SET status = $1 WHERE id = ANY($2)", [
      status,
      ids,
    ]);
    res.status(200).json({ message: "The status of users has been updated" });
  } catch (err) {
    console.error("Error when updating user status:", err);
    res.status(500).json({ error: "Server error during status update" });
  }
});
module.exports = router;
