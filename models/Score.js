const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0, // 🔒 Prevent negative scores
    },
    attestationId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Score", scoreSchema);
