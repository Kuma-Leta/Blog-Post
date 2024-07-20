import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import { useUser } from "../UserContext";

import logo from "../../public/DLogo.png";
import maleDefault from "../../public/john_doe.png";
import femaleDefault from "../../public/jane_smith.png";
import { BASE_URL } from "../config";

interface NavLinkProps {
  to: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const NavbarLoggedIn: React.FC = () => {
  const { user, setUser } = useUser();
  const [isSticky, setIsSticky] = useState(false);
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

  const photoSrc = user?.photo
    ? `${BASE_URL}/${user.photo}`
    : user?.gender === "female"
    ? femaleDefault
    : maleDefault;

  return (
    <nav
      className={`bg-blue-50 p-4 z-50 ${
        isSticky ? "fixed top-0 left-0 right-0" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center relative z-10">
        <Link to="/home" className="flex items-center">
          <img
            src={logo}
            alt="Company Logo"
            className="h-8 md:h-10 p-1 rounded-full shadow-md"
            style={{ backgroundColor: "#FFFFFF" }}
          />
          <span
            className={`text-2xl font-bold ml-2 text-black`}
            style={{ fontFamily: "MuseoModerno, sans-serif", color: "#000" }}
          >
            Debbal Tech Gazette
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black focus:outline-none"
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
          <div className={`hidden md:flex space-x-4 items-center`}>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/profile/userProfile">Profile</NavLink>
          </div>
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } md:hidden absolute top-16 left-0 right-0 bg-blue-50 z-50`}
          >
            <div className="flex flex-col items-center space-y-2 py-4">
              <NavLink to="/home" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink
                to="/profile/userProfile"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </NavLink>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className={`flex items-center px-3 py-2 rounded-full text-sm font-medium text-black hover:bg-blue-100 hover:border-1 hover:border-purple-500 focus:outline-none`}
            >
              <img
                src={photoSrc}
                alt="User Avatar"
                className="h-8 w-8 rounded-full mr-2"
              />
              <span className="text-base">{user?.name || "User"}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-blue-100 rounded-full shadow-lg z-50">
                <NavLink
                  to="/"
                  onClick={() => {
                    handleLogout();
                    closeDropdown();
                  }}
                  className="flex items-center px-2 py-2 hover:bg-blue-200 transition duration-300"
                >
                  <div className="flex items-center justify-center">
                    <FaSignOutAlt className="mr-2 text-purple-700" />
                    Logout
                  </div>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ to, onClick, children }) => (
  <Link
    to={to}
    className={`block px-3 py-2 text-sm font-medium text-black rounded-full transition duration-300 hover:text-gray-900 hover:bg-blue-100 hover:border-2 hover:border-purple-500`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default NavbarLoggedIn;
