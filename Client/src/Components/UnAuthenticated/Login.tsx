/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import LoadingSpinner from "./LoadingSpinner";
import { useUser } from "../../UserContext";
import SuccessMessage from "../Profile/UserProfile/SuccessMessage";
import ErrorMessage from "../Profile/UserProfile/ErrorMessage";
import SocialMediaIcons from "./SocialMediaIcons";

import api from "../../axiosConfig";

const Login: React.FC = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  async function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const userCredential = await api.post(`/users/login`, {
        email,
        password,
      });

      console.log(userCredential);

      if (userCredential) {
        setError("");
        setShowErrorMessage(false);
        setResult("Congratulations! Successfully logged in.");
        localStorage.setItem("authToken", userCredential.data.token);
        const userData = userCredential.data.data.user;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setShowSuccessMessage(true);
        setTimeout(() => navigate("/home"), 2000);
      }
    } catch (error: any) {
      setShowSuccessMessage(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setShowErrorMessage(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        {loading && <LoadingSpinner loading={loading} />}
        {showSuccessMessage && (
          <SuccessMessage
            message={result}
            onClose={() => setShowSuccessMessage(false)}
          />
        )}
        {showErrorMessage && (
          <ErrorMessage
            message={error}
            onClose={() => setShowErrorMessage(false)}
          />
        )}
        {!showSuccessMessage && (
          <form onSubmit={formSubmitHandler} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">LOGIN</h2>
            <div className="relative">
              <MdEmail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                size={24}
              />
              <input
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 pl-10 border border-gray-300 rounded-full"
              />
            </div>
            <div className="relative">
              <MdLock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                size={24}
              />
              <input
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 pl-10 border border-gray-300 rounded-full"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-full shadow-md transition duration-300"
              >
                Login
              </button>
            </div>
            <div className="flex justify-between items-center">
              <Link
                to="/forgotpassword"
                className="text-sm text-purple-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <hr className="my-4" />
            <div className="text-center">or SIGNUP VIA: </div>
            <div className="bg-gray-800 py-2 px-4 rounded-full">
              <SocialMediaIcons />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
