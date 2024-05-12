import express from "express";
import client from "../../db.js";

const router = express.Router();

// Route to get users
router.get("/", async (req, res) => {
  try {
    const users = await client.query("SELECT * FROM users");
    if (!users.rows.length)
      return res.status(404).json({ error: "Users not found" });
    res.json(users.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error });
  }
});

// Route to get user details
router.get("/:id", async (req, res) => {
  try {
    const user = await client.query("SELECT * FROM users WHERE user_id = $1", [
      req.params.id,
    ]);
    if (!user.rows.length)
      return res.status(404).json({ error: "User not found" });
    res.json(user.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error });
  }
});

export default router;
