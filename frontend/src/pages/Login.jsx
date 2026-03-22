import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", form);
      localStorage.setItem("token", response.data.token);
      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);

      setMsg(response.data.message);

      window.dispatchEvent(new Event("userLoggedIn"));

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMsg(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {msg && (
          <div className="mb-4 text-center text-sm text-green-600 font-medium  p-2 rounded-md">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition duration-200"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition duration-200"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md 
        hover:bg-blue-700 active:scale-[0.98] 
        transition duration-200 font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
