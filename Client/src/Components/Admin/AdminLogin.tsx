import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log(email, password);

      const userCredential = await axios.post(
        "http://localhost:5000/api/v1/admin/login",
        { email, password }
      );

      const user = userCredential.data.data.user;
      const token = userCredential.data.token;

      localStorage.setItem("authToken", token);

      // Redirect to appropriate dashboard based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard"); // Navigate to admin dashboard
      } else {
        navigate("/"); // Navigate to default route
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Incorrect email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to Your Account
          </h2>
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 py-2 px-3 rounded">
              {error}
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md shadow-sm block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Email address"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3 rounded-md shadow-sm block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
