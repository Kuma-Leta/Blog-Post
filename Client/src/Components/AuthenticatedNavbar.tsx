import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

const NavbarLoggedIn: React.FC = () => {
  const { user, setUser } = useUser();
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <nav
      className={`bg-gray-800 p-4 transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 right-0 bg-white shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="flex items-center">
          <img
            src="../../public/DLogo.png"
            alt="Company Logo"
            className="h-8 md:h-10 p-1 rounded-full shadow-md"
            style={{ backgroundColor: "#FFFFFF" }}
          />
          <span
            className={`text-2xl font-bold ml-2 ${
              isSticky ? "text-black" : "text-white"
            } transition-all duration-300`}
          >
            My Blog
          </span>
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/home"
            className={`hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${
              isSticky ? "text-gray-800" : "text-white"
            } transition-all duration-300`}
          >
            Home
          </Link>
          <Link
            to="/posts"
            className={`hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${
              isSticky ? "text-gray-800" : "text-white"
            } transition-all duration-300`}
          >
            Posts
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className={`flex items-center hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${
                isSticky ? "text-gray-800" : "text-white"
              } transition-all duration-300`}
            >
              <img
                src={user?.photo || "../../public/defaultAvatar.png"}
                alt="User Avatar"
                className="h-8 w-8 rounded-full mr-2"
              />
              {user?.name || "User"}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Link
                  to="/my-posts"
                  onClick={closeDropdown}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  My Posts
                </Link>
                <Link
                  to="/profile/userProfile"
                  onClick={closeDropdown}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <Link
                  to="/"
                  onClick={handleLogout}
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
