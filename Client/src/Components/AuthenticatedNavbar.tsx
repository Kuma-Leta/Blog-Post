/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

import logo from "../../public/DLogo.png";
import maleDefault from "../../public/john_doe.png";
import femaleDefault from "../../public/jane_smith.png";

const NavbarLoggedIn: React.FC = () => {
  const { user, setUser } = useUser();
  const [, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsSticky(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  // Determine the source URL for the user's photo or default image
  const photoSrc = user?.photo
    ? `http://localhost:5000/${user.photo}`
    : user?.gender === "female"
    ? femaleDefault
    : maleDefault;

  return (
    <nav className={`bg-gray-900 p-4 transition-all duration-300 z-50`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="flex items-center">
          <img
            src={logo}
            alt="Company Logo"
            className="h-8 md:h-10 p-1 rounded-full shadow-md"
            style={{ backgroundColor: "#FFFFFF" }}
          />
          <span
            className={`text-2xl font-bold ml-2 text-white transition-all duration-300`}
            style={{ fontFamily: "MuseoModerno, sans-serif", color: "#FFFFFF" }}
          >
            Debbal Tech Gazette
          </span>
        </Link>
        <div className="flex items-center">
          {/* Hamburger menu for small screens */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {/* Links for desktop screens */}
          <div className={`hidden md:flex space-x-4`}>
            <Link
              to="/home"
              className={`hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium text-white transition-all duration-300`}
            >
              Home
            </Link>
            <Link
              to="/profile/userProfile"
              className={`hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium text-white transition-all duration-300`}
            >
              Profile
            </Link>
          </div>
          {/* Mobile menu */}
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } md:hidden absolute top-16 left-0 right-0 bg-gray-900 z-50`}
          >
            <div className="flex flex-col items-center space-y-2 py-4">
              <Link
                to="/home"
                className={`hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium text-white transition-all duration-300`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/profile/userProfile"
                className={`hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium text-white transition-all duration-300`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </div>
          {/* User profile dropdown for mobile screens */}
          <div className="relative md:hidden">
            <button
              onClick={toggleDropdown}
              className={`flex items-center hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium text-white transition-all duration-300`}
            >
              <img
                src={photoSrc}
                alt="User Avatar"
                className="h-8 w-8 rounded-full mr-2"
              />
              <span className="text-base">{user?.name || "User"}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md shadow-lg">
                <Link
                  to="/"
                  onClick={() => {
                    handleLogout();
                    closeDropdown(); // Close dropdown after logout
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
          {/* User profile dropdown for desktop screens */}
          <div className="relative hidden md:block">
            <button
              onClick={toggleDropdown}
              className={`flex items-center hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium text-white transition-all duration-300`}
            >
              <img
                src={photoSrc}
                alt="User Avatar"
                className="h-8 w-8 rounded-full mr-2"
              />
              <span className="text-base">{user?.name || "User"}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md shadow-lg">
                <Link
                  to="/"
                  onClick={() => {
                    handleLogout();
                    closeDropdown(); // Close dropdown after logout
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLoggedIn;
