import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleForgotPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/forgotpassword",
        { email }
      );
      console.log(response.data);
      setMessage("Password reset link sent to your email.");
      setError(null);
    } catch (error) {
      setError("Error sending password reset link. Please try again.");
      setMessage(null);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
          <div>
            <input
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send Reset Link
            </button>
          </div>
          {message && (
            <p className="mt-4 text-green-500 text-center">{message}</p>
          )}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          <hr className="my-4" />
          <div className="flex justify-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
