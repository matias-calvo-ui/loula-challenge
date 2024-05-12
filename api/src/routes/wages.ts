import express from "express";
import client from "../../db.js";

const router = express.Router();

// Route to get wages
router.get("/:id", async (req, res) => {
  try {
    const wages = await client.query("SELECT * FROM wages WHERE user_id = $1", [
      req.params.id,
    ]);
    if (!wages.rows.length)
      return res.status(404).json({ error: "Wages not found" });

    res.json(wages.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to add a wage
router.post("/", async (req, res) => {
  const { user_id, amount, currency } = req.body;
  try {
    await client.query(
      "INSERT INTO wages (user_id, amount, currency) VALUES ($1, $2, $3)",
      [user_id, amount, currency]
    );
    res.json({ message: "Wage created successfully" });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
