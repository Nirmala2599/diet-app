const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    meals: [
      {
        name: String,
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number,
        ingredients: [String],
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    totalCalories: Number,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Diet", dietSchema);
