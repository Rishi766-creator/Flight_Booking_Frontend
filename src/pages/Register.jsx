import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully. Please login");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed. Please try again");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 sm:p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={form.name}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 transition text-white font-semibold py-2 rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
