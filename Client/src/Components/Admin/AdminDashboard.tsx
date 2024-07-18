import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";

import { BASE_URL } from "../../config";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  gender: string;
  createdAt: string;
  numberOfPost: number;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentView, setCurrentView] = useState<"dashboard" | "users">(
    "dashboard"
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const updateURLParams = () => {
    const params = new URLSearchParams();
    params.append("page", currentPage.toString());
    if (searchTerm) params.append("search", searchTerm);
    if (sortBy) params.append("sortBy", sortBy);
    params.append("order", sortOrder);
    navigate({ search: params.toString() });
  };

  const parseURLParams = () => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const search = params.get("search");
    const sortBy = params.get("sortBy");
    const order = params.get("order");

    setCurrentPage(parseInt(page || "1"));
    setSearchTerm(search || "");
    setSortBy(sortBy || "");
    setSortOrder(order || "asc");
  };

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setTotalUsers(response.data.totalUsers);
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };

  useEffect(() => {
    parseURLParams();
    fetchTotalUsers();
  }, []);

  useEffect(() => {
    if (currentView === "users") {
      fetchUsers();
    }
  }, [currentPage, searchTerm, sortBy, sortOrder, currentView]);

  const fetchUsers = async () => {
    try {
      let url = `${BASE_URL}/api/v1/admin?page=${currentPage}&limit=${usersPerPage}`;
      if (searchTerm) {
        url += `&search=${searchTerm}`;
      }
      if (sortBy) {
        url += `&sortBy=${sortBy}&order=${sortOrder}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUsers(response.data.data.data);
      updateURLParams();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const [field, order] = value.split(":");
    setSortBy(field);
    setSortOrder(order);
  };

  const handleViewDetails = async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setSelectedUser(response.data.data.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await axios.delete(`${BASE_URL}/api/v1/admin/${selectedUser._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setDeleteModalOpen(false);
        setSuccessMessage(`Successfully deleted user: ${selectedUser.name}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [successMessage]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="bg-gray-800 w-64">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <span className="text-white text-lg font-bold">Admin Dashboard</span>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => {
              setCurrentView("dashboard");
              navigate("/admin/dashboard");
            }}
            className={`block py-2 px-4 text-gray-200 hover:bg-gray-700 ${
              currentView === "dashboard" && "bg-gray-700"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              setCurrentView("users");
              fetchUsers();
            }}
            className={`block py-2 px-4 text-gray-200 hover:bg-gray-700 ${
              currentView === "users" && "bg-gray-700"
            }`}
          >
            Users
          </button>
          <a
            href="#"
            className="block py-2 px-4 text-gray-200 hover:bg-gray-700"
          >
            Settings
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-200 hover:bg-gray-700"
          >
            Logout
          </a>
        </nav>
      </div>
      <div className="flex-1 p-10">
        {currentView === "dashboard" ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="bg-white p-6 rounded shadow-md">
              <p className="text-lg mb-4">Welcome to the Admin Dashboard!</p>
              <p>
                Here you can manage users, view statistics, and configure
                settings for your application.
              </p>
              <div className="mt-4">
                <table className="min-w-full bg-white border border-gray-300">
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b font-semibold">
                        Total Users:
                      </td>
                      <td className="py-2 px-4 border-b">{totalUsers}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b font-semibold">
                        Total Posts:
                      </td>
                      <td className="py-2 px-4 border-b">100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-center gap-5">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border border-gray-300 px-3 py-2 mr-2 rounded-full"
                placeholder="Search by name or email"
              />
              <button
                onClick={fetchUsers}
                className="bg-purple-500 text-white px-4 py-2 rounded-full"
              >
                Search
              </button>
              <select
                value={`${sortBy}:${sortOrder}`}
                onChange={handleSortChange}
                className="ml-2 border border-gray-300 px-3 py-2 rounded-full"
              >
                <option value="">Sort by</option>
                <option value="name:asc">Name A-Z</option>
                <option value="name:desc">Name Z-A</option>
                <option value="createdAt:asc">Oldest</option>
                <option value="createdAt:desc">Newest</option>
              </select>
            </div>
            <div className="mt-4">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Joined</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td
                        className="px-4 py-
2"
                      >
                        {user.role}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleViewDetails(user._id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setDeleteModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">
                    Showing{" "}
                    {users.length > 0
                      ? (currentPage - 1) * usersPerPage + 1
                      : 0}
                    -{Math.min(currentPage * usersPerPage, totalUsers)} of{" "}
                    {totalUsers} users
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handlePagination(currentPage > 1 ? currentPage - 1 : 1)
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-1 text-sm ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => handlePagination(currentPage + 1)}
                    disabled={
                      currentPage === Math.ceil(totalUsers / usersPerPage)
                    }
                    className={`px-3 py-1 text-sm ml-2 ${
                      currentPage === Math.ceil(totalUsers / usersPerPage)
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          {selectedUser && (
            <>
              <h2 className="text-2xl font-bold mb-4">User Details</h2>
              <div className="mb-4">
                <p className="font-semibold">Name:</p>
                <p>{selectedUser.name}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Email:</p>
                <p>{selectedUser.email}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Role:</p>
                <p>{selectedUser.role}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Gender:</p>
                <p>{selectedUser.gender}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Joined:</p>
                <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>
            </>
          )}
        </Modal>
      )}
      {deleteModalOpen && (
        <Modal closeModal={() => setDeleteModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-4">
            Are you sure you want to delete user: {selectedUser?.name}?
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleDeleteUser}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
      {successMessage && (
        <div className="fixed bottom-0 left-0 w-full bg-green-500 text-white p-4 text-center">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
