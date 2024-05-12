import express from "express";
import client from "../../db.js";

const router = express.Router();

// Route to get requests
router.get("/:id", async (req, res) => {
  try {
    const requests = await client.query(
      "SELECT * FROM requests WHERE user_id = $1",
      [req.params.id]
    );
    if (!requests.rows.length)
      return res.status(404).json({ error: "Requests not found" });

    res.json(requests.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to create a request
router.post("/", async (req, res) => {
  const { user_id, amount, currency } = req.body;
  try {
    let requestsAmount = amount;
    const requests = await client.query(
      "SELECT * FROM requests WHERE user_id = $1 AND status = 'approved'",
      [user_id]
    );
    if (requests.rows.length) {
      requests.rows.forEach(
        (request) =>
          (requestsAmount =
            Math.round(requestsAmount) + Math.round(request.amount))
      );
    }

    const wages = await client.query(
      "SELECT amount FROM wages WHERE user_id = $1",
      [user_id]
    );
    if (!wages.rows.length)
      return res.status(500).json({ error: "User has no balance" });

    let balance = 0;
    wages.rows.forEach((wage) => (balance += Math.round(wage.amount)));

    let status = "pending";

    if (requestsAmount !== 0 && requestsAmount <= balance / 2) {
      status = "approved";
    } else {
      status = "rejected";
    }

    await client.query(
      "INSERT INTO requests (user_id, amount, currency, status) VALUES ($1, $2, $3, $4)",
      [user_id, amount, currency, status]
    );
    res.json({ message: "Request created successfully" });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error });
  }
});

export default router;
