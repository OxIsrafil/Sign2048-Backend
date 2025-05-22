const express = require("express");
const router = express.Router();
const Score = require("../models/Score");

// POST /api/scores
router.post("/", async (req, res) => {
  try {
    let { address, score, attestationId } = req.body;

    if (!address || score === undefined || !attestationId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Sanitize inputs
    address = address.toLowerCase().trim();
    score = parseInt(score);

    if (isNaN(score) || score < 0) {
      return res.status(400).json({ message: "Invalid score value" });
    }

    const existing = await Score.findOne({ address });

    if (!existing || score > existing.score) {
      const updated = await Score.findOneAndUpdate(
        { address },
        {
          address,
          score,
          attestationId,
          updatedAt: new Date(),
        },
        { upsert: true, new: true }
      );

      return res.status(201).json({
        message: "✅ New high score submitted!",
        data: updated,
      });
    }

    return res.status(200).json({ message: "Lower or equal score ignored" });
  } catch (err) {
    console.error("❌ Error saving score:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/scores/leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1, updatedAt: -1 })
      .limit(20);

    res.json(scores);
  } catch (err) {
    console.error("❌ Error fetching leaderboard:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
