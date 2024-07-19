import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import api from "../../axiosConfig";
import UsersView from "./UsersView";
import PostsView from "./PostsView"; // Import the new PostsView component

const AdminDashboard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0); // Added state for total posts
  const [currentView, setCurrentView] = useState<
    "dashboard" | "users" | "posts"
  >("dashboard");

  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    try {
      const userResponse = await api.get(`/admin`);
      setTotalUsers(userResponse.data.totalUsers);

      const postResponse = await api.get(`/admin/getAllposts`);
      setTotalPosts(postResponse.data.totalPosts); // Set the total posts
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = params.get("view") as "dashboard" | "users" | "posts"; // Updated type
    if (view) {
      setCurrentView(view);
    } else {
      navigate("/admin/dashboard?view=dashboard", { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    fetchData(); // Fetch both users and posts
  }, [currentView]);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          navigate(`/admin/dashboard?view=${view}`);
        }}
        fetchUsers={fetchData} // Update the fetch function
        fetchPosts={fetchData} // Pass fetchData for posts as well
      />
      <div className="main-content flex-1 p-8 md:p-12 bg-gray-200 overflow-y-auto">
        {currentView === "dashboard" ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Dashboard Overview
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg mb-4 text-gray-600">
                Welcome to the Admin Dashboard!
              </p>
              <p className="text-gray-600">
                Here you can manage users, view statistics, and configure
                settings for your application.
              </p>
              <div className="mt-6">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="py-3 px-4 border-b text-gray-600 font-semibold">
                        Metric
                      </th>
                      <th className="py-3 px-4 border-b text-gray-600 font-semibold">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-gray-700">Total Users:</td>
                      <td className="py-2 px-4 text-gray-700">{totalUsers}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-gray-700">Total Posts:</td>
                      <td className="py-2 px-4 text-gray-700">{totalPosts}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : currentView === "users" ? (
          <UsersView />
        ) : (
          <PostsView /> // Render PostsView for posts
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
