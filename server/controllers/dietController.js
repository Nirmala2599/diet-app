const Diet = require("../models/Diet");
const History = require("../models/History");


const calculateDiet = async (req, res) => {
  try {
    const { age, gender, weight, height, activityLevel, goal } = req.body;

    // 1. Calculate BMI
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    // 2. Calculate BMR (Mifflin-St Jeor)
    let bmr;

    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // 3. Activity multiplier
    const activityMap = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    let calories = bmr * activityMap[activityLevel];

    // 4. Goal adjustment
    if (goal === "lose") calories -= 500;
    if (goal === "gain") calories += 500;

    calories = Math.round(calories);

    // 5. Diet suggestion
    let suggestion = "";

    if (goal === "lose") {
      suggestion = "High protein, low sugar, more vegetables, 3L water/day.";
    } else if (goal === "gain") {
      suggestion = "High protein, calorie surplus, nuts, milk, rice, bananas.";
    } else {
      suggestion = "Balanced diet with protein, carbs, fats, and vegetables.";
    }
    
await History.create({
  user: req.userId,
  bmi: bmi,
  bmiStatus:
    bmi < 18.5
      ? "Underweight"
      : bmi < 25
      ? "Normal"
      : "Overweight",
  calories,
  suggestion,
});



    res.json({
      bmi,
      calories,
      suggestion,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { calculateDiet };