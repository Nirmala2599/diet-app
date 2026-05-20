import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      navigate("/diet");
      alert("Login successful!");
      
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  
 
  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-4">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
        Login
      </h2>

      <form onSubmit={handleLogin}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 mb-4 rounded-lg"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 mb-4 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);


}