import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";

import { FaUser, FaLock } from "react-icons/fa";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredential = await api.post(`/admin/login`, {
        email,
        password,
      });

      const user = userCredential.data.data.user;
      const token = userCredential.data.token;

      localStorage.setItem("authToken", token);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Incorrect email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Log in as Admin
          </h2>
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 py-2 px-4 rounded-md shadow-sm">
              {error}
            </div>
          )}
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-full shadow-md transition duration-300 ease-in-out"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
