import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import SignUp from "./Signup";
import Navbar from "./Navbar";

const AuthenticationPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setShowLogin(true);
    } else if (location.pathname === "/signup") {
      setShowLogin(false);
    }
  }, [location]);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleSignUpClick = () => {
    setShowLogin(false);
  };

  return (
    <div>
      <Navbar theme="light" />
      <div
        className="flex flex-col mt-10 lg:flex-row min-h-screen bg-gray-100 "
        style={{
          backgroundImage: `url('../public/network-connection-background_23-2148879892.avif')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Left Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 lg:shadow-lg">
          <div className="text-center text-white">
            <h1
              className="text-4xl font-bold mb-4"
              style={{
                fontFamily: "MuseoModerno, sans-serif",
                color: "#FFFFFF",
              }}
            >
              Debbal Tech Gazette
            </h1>
            <p className="text-lg mb-8">Start blogging today!</p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={handleLoginClick}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-md transition duration-300 disabled:opacity-50 mb-4"
              >
                Login
              </button>
              <button
                onClick={handleSignUpClick}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-2 px-6 rounded-full shadow-md transition duration-300 disabled:opacity-50"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {showLogin ? <Login /> : <SignUp />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
