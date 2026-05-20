import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DietForm() {

 
    const navigate = useNavigate();

   const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }



  const [form, setForm] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    goal: "",
  });

  const [result, setResult] = useState(null);
  const [bmi, setBmi] = useState("");
  const [bmiStatus, setBmiStatus] = useState("");
  
 

  const handleChange = (e) => {
    setForm({
      
      ...form,

    
      [e.target.name]: e.target.value,
    });
  };
 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const heightInMeters = form.height / 100;
    const bmiValue = (
      form.weight /
  (heightInMeters * heightInMeters)
).toFixed(1);

setBmi(bmiValue);

if (bmiValue < 18.5) {
  setBmiStatus("Underweight");
} else if (bmiValue < 25) {
  setBmiStatus("Normal");
} else {
  setBmiStatus("Overweight");
}

    try {
      const token = localStorage.getItem("token");
      

      const res = await axios.post(
        "https://diet-app-b4iz.onrender.com/api/diet/calculate",
        {
             ...form,
             bmi,
             bmiStatus,
        },
     
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
   <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
   <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-4">
   
   

  

      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Diet Calculator</h2>
      

      <form  onSubmit={handleSubmit}>
        <input
          name="age"
          placeholder="Age"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          name="weight"
          placeholder="Weight (kg)"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          name="height"
          placeholder="Height (cm)"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <select
          name="gender"
          value={form.gender}
         
          onChange={handleChange}
            className="w-full border border-gray-300 p-3 mb-4 rounded-lg"

        >
            <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">
            Female
          </option>
        </select>

        <select
          name="activityLevel"
           value={form.activityLevel}
          onChange={handleChange}
            className="w-full border border-gray-300 p-3 mb-4 rounded-lg"

          
        >
            <option value="">Select Activity Level</option>
          <option value="sedentary">
            Sedentary
          </option>
          <option value="light">
            Light
          </option>
          <option value="moderate">
            Moderate
          </option>
          <option value="active">
            Active
          </option>
          <option value="very_active">
            Very Active
          </option>
        </select>

        <select
          name="goal"
           value={form.goal}
          onChange={handleChange}
            className="w-full border border-gray-300 p-3 mb-4 rounded-lg"

        >
            <option value="">Select Goal</option>
          <option value="lose">
            Lose Weight
          </option>
          <option value="maintain">
            Maintain
          </option>
          <option value="gain">
            Gain Weight
          </option>
        </select>

        <button className="w-full bg-blue-600 text-white py-3 rounded" type="submit">
          Calculate
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-green-100 p-4 rounded-lg shadow">
    <h3 className="text-xl font-bold mb-3">
      Your Diet Result
    </h3>

  {bmi && (
  <div className="mt-4 text-center">
    <h3 className="text-lg font-semibold">
      Your BMI: {bmi}
    </h3>
   
   <p className="text-sm text-gray-700 mt-1">
  Status: {bmiStatus}
</p>
  </div>
)}

    <p className="mb-2">
      <strong>Calories:</strong> {result.calories}
    </p>

    <p>
      <strong>Suggestion:</strong>{" "}
      {result.suggestion}
    </p>
  </div>

      )}
    </div>
    </div>
  );
}