const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, age, weight, height, dietaryPreferences, allergies } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        age,
        weight,
        height,
        dietaryPreferences,
        allergies,
      },
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;