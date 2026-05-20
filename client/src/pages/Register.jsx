import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

const token = localStorage.getItem("token");

if (token) {
  navigate("/diet");
}

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registration successful!");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
   <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-4">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Register</h2>

      <form onSubmit={handleRegister}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded" type="submit">
          Register
        </button>
      </form>
      </div>
      </div>
    
  );
}