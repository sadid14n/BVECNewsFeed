import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Layout from "../component/Layout";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    dept: "",
    club: "",
    secretCode: "",
  });

  useEffect(() => {
    if (auth?.token) {
      navigate(location.state || "/");
    }
  }, [auth, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${baseURL}/api/v1/user/register`, formData);
      console.log("Registration success:", res.data);

      if (res.data.success) {
        toast.success("Registration successful!");
        // Clear form
        setFormData({ name: "", email: "", password: "", role: "" });
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      toast("Registration failed. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <Toaster />
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Register
          </h2>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">Role</label>
            <select
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a role</option>
              <option value="principal">Principal</option>
              <option value="student_union">SU</option>
              <option value="department">Department</option>
              <option value="club">Club</option>
            </select>
          </div>

          {/* Conditionally show Department field */}
          {formData.role.startsWith("dep") && (
            <div>
              <label className="block mb-1 text-gray-600 font-medium">
                Department
              </label>
              <select
                name="dept"
                value={formData.dept}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Department</option>
                <option value="CSE">CSE</option>
                <option value="ETE">ETE</option>
                <option value="ME">ME</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            </div>
          )}

          {/* Conditionally show Club field */}
          {formData.role.startsWith("club") && (
            <div>
              <label className="block mb-1 text-gray-600 font-medium">
                Club
              </label>
              <select
                name="club"
                value={formData.club}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Club</option>
                <option value="code">Code Club</option>
                <option value="dance">Dance Club</option>
                <option value="dance">Music Club</option>
                <option value="dance">Drama Club</option>
              </select>
            </div>
          )}

          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Enter the Secret Code
            </label>
            <input
              type="text"
              name="secretCode"
              required
              value={formData.secretCode}
              onChange={handleChange}
              placeholder="Enter secret code provided by admin"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already registered?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline font-medium cursor-pointer"
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
