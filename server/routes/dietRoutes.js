const express = require("express");
const History = require("../models/History");
const { calculateDiet } = require("../controllers/dietController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/calculate", protect, calculateDiet);

router.get("/history", protect, async (req, res) => {
  const history = await History.find({
    user: req.userId,
  }).sort({ createdAt: -1 });

  res.json(history);
});

router.delete("/history/:id", protect, async (req, res) => {
  await History.findByIdAndDelete(req.params.id);
  res.json({ message: "History deleted" });
});

module.exports = router;