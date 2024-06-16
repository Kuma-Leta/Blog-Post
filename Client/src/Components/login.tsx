/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { IoLogoGoogle } from "react-icons/io";
import Navbar from "./Navbar";
import LoadingSpinner from "./LoadingSpinner";
import { useUser } from "../UserContext";

const Login: React.FC = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      const userCredential = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        { email, password }
      );

      if (userCredential) {
        setError("");
        setResult("Congratulations! Successfully logged in.");
        localStorage.setItem("authToken", userCredential.data.token);
        const userData = userCredential.data.data.user;
        setUser(userData);
        console.log(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log(userCredential.data);
        console.log(userCredential.data.data.user);
        console.log(userCredential.data.token);
        setTimeout(() => navigate("/home"), 2000);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div>
      <Navbar theme="light" />
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <div className="flex items-center justify-center mt-12 min-h-screen bg-gray-100">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <form onSubmit={formSubmitHandler} className="space-y-6">
              <h2 className="text-2xl font-bold text-center">LOGIN</h2>
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
                <input
                  placeholder="Enter password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-500">
                    Sign up
                  </Link>
                </p>
                <Link to="/forgotpassword" className="text-sm text-blue-500">
                  Forgot password?
                </Link>
              </div>
              {result && (
                <p className="mt-4 text-green-500 text-center">{result}</p>
              )}
              {error && (
                <p className="mt-4 text-red-500 text-center">{error}</p>
              )}
              <hr className="my-4" />
              <div className="text-center">or</div>
              <div className="mt-4 flex justify-center">
                <button className="flex items-center py-2 px-4 border border-gray-300 rounded hover:bg-gray-100">
                  <IoLogoGoogle size={28} className="mr-2" />
                  Sign in with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
