import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

interface SideNavbarProps {
  currentView: "dashboard" | "users" | "posts"; // Updated type
  setCurrentView: (view: "dashboard" | "users" | "posts") => void; // Updated type
  fetchUsers: () => void;
  fetchPosts?: () => void; // Optional fetchPosts function
}

const SideNavbar: React.FC<SideNavbarProps> = ({
  currentView,
  setCurrentView,
  fetchUsers,
  fetchPosts,
}) => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear authentication tokens or user session
    localStorage.removeItem("authToken"); // Adjust if you use another method for tokens
    // Redirect to login page or home page
    navigate("/admin/login");
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg z-50">
      <div className="flex items-center justify-center h-20 border-b border-gray-700 bg-gray-900">
        <span className="text-white text-xl font-bold">Admin Dashboard</span>
      </div>
      <nav className="mt-4">
        <button
          onClick={() => {
            setCurrentView("dashboard");
            navigate("/admin/dashboard");
          }}
          className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out ${
            currentView === "dashboard" && "bg-gray-700 text-white"
          }`}
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </button>
        <button
          onClick={() => {
            setCurrentView("users");
            fetchUsers();
          }}
          className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out ${
            currentView === "users" && "bg-gray-700 text-white"
          }`}
        >
          <FaUsers className="mr-3" />
          Users
        </button>
        <button
          onClick={() => {
            setCurrentView("posts");
            fetchPosts && fetchPosts(); // Fetch posts if the function is provided
          }}
          className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out ${
            currentView === "posts" && "bg-gray-700 text-white"
          }`}
        >
          <FaClipboardList className="mr-3" />
          Posts
        </button>
        <a
          href="#"
          className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out"
        >
          <FaCog className="mr-3" />
          Settings
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out"
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default SideNavbar;
