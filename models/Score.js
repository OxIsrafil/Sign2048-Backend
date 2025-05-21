const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      index: true,
    },
    score: {
      type: Number,
      required: true,
    },
    attestationId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Score", scoreSchema);
