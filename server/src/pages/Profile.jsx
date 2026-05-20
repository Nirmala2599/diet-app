import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [history, setHistory] = useState([]);
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

useEffect(() => {
  axios
    .get("http://localhost:5000/api/diet/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setHistory(res.data))
    .catch((err) => console.log(err));
}, [token]);

const handleDelete = async (id) => {
  await axios.delete(
    `http://localhost:5000/api/diet/history/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setHistory(
    history.filter((item) => item._id !== id)
  );
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          {name || "User"}'s Profile</h2>

        <h3 className="font-semibold mb-2">
          Previous Diet History
        </h3>

        {history.map((item) => (
          <div
            key={item._id}
            className="border p-3 mb-3 rounded"
          >
            <p>BMI: {item.bmi}</p>
            <p>Status: {item.bmiStatus}</p>
            <p>Calories: {item.calories}</p>
            <p className="text-sm text-gray-500">
  {new Date(item.createdAt).toLocaleDateString()}
</p>
<button
onClick={() => {
  if (window.confirm("Delete this history?")) {
    handleDelete(item._id);
  }
}}
  className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
>
  Delete
</button>

          </div>
        ))}
      </div>
    </div>
  );
}