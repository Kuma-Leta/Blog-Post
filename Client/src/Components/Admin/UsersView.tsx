import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import api from "../../axiosConfig";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  gender: string;
  createdAt: string;
  numberOfPost: number;
}

const UsersView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const updateURLParams = () => {
    const params = new URLSearchParams();
    params.append("view", "users");
    params.append("page", currentPage.toString());
    if (searchTerm) params.append("search", searchTerm);
    if (sortBy) params.append("sortBy", sortBy);
    params.append("order", sortOrder);
    navigate(`/admin/dashboard?${params.toString()}`);
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

  useEffect(() => {
    parseURLParams();
  }, [location.search]);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, sortBy, sortOrder]);

  const fetchUsers = async () => {
    try {
      let url = `/admin?page=${currentPage}&limit=${usersPerPage}`;
      if (searchTerm) {
        url += `&search=${searchTerm}`;
      }
      if (sortBy) {
        url += `&sortBy=${sortBy}&order=${sortOrder}`;
      }
      const response = await api.get(url);
      setUsers(response.data.data.data);
      setTotalUsers(response.data.totalUsers);
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
      console.log(userId);
      const response = await api.get(`/admin/${userId}`);
      console.log(response.data.data.data.name);
      setSelectedUser(response.data.data.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await api.delete(`/admin/${selectedUser._id}`);
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
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-6 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-3/4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 px-4 py-3 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-2/3"
            placeholder="Search by name or email"
          />
          <button
            onClick={fetchUsers}
            className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-5 py-3 rounded-full shadow-md hover:from-purple-500 hover:to-indigo-600 transition duration-300 w-full md:w-auto"
          >
            Search
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-1/4">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Sort by:
          </label>
          <select
            id="sort"
            value={`${sortBy}:${sortOrder}`}
            onChange={handleSortChange}
            className="block w-full pl-4 pr-12 py-3 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="createdAt:asc">Date Created (Asc)</option>
            <option value="createdAt:desc">Date Created (Desc)</option>
            <option value="name:asc">Name (Asc)</option>
            <option value="name:desc">Name (Desc)</option>
            <option value="email:asc">Email (Asc)</option>
            <option value="email:desc">Email (Desc)</option>
          </select>
        </div>
      </div>
      {successMessage && (
        <div className="bg-green-500 text-white px-4 py-2 rounded-md mb-4">
          {successMessage}
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Number of Posts</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.gender}</td>
              <td className="py-2 px-4 border-b">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">{user.numberOfPost}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleViewDetails(user._id)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-full mr-2 shadow-md transition-transform transform hover:scale-105 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setDeleteModalOpen(true);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(totalUsers / usersPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePagination(i + 1)}
              className={`${
                currentPage === i + 1
                  ? "bg-purple-500 text-white"
                  : "bg-white text-purple-500"
              } px-4 py-2 mx-1 border border-purple-500 rounded-full`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      {showModal && selectedUser && (
        <Modal user={selectedUser} onClose={() => setShowModal(false)} />
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this user?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersView;
