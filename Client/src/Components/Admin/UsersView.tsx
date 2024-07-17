import React, { useState, useEffect } from "react";
import axios from "axios";

interface UsersViewProps {
  handleViewDetails: (userId: string) => void;
}

const UsersView: React.FC<UsersViewProps> = ({ handleViewDetails }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, sortBy, sortOrder]);

  const fetchUsers = async () => {
    try {
      let url = `http://localhost:5000/api/v1/admin?page=${currentPage}&limit=${usersPerPage}`;
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

  return (
    <>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 px-3 py-2 mr-2"
          placeholder="Search by name or email"
        />
        <button
          onClick={fetchUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <select
          value={`${sortBy}:${sortOrder}`}
          onChange={handleSortChange}
          className="ml-2 border border-gray-300 px-3 py-2"
        >
          <option value="">Sort By</option>
          <option value="name:asc">Name A-Z</option>
          <option value="name:desc">Name Z-A</option>
          <option value="role:asc">Role</option>
          <option value="gender:male">Gender: Male</option>
          <option value="gender:female">Gender: Female</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">All Users</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 bg-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="py-2 px-4 border-b-2 bg-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="py-2 px-4 border-b-2 bg-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Role
              </th>
              <th className="py-2 px-4 border-b-2 bg-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Gender
              </th>
              <th className="py-2 px-4 border-b-2 bg-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">{user.gender}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleViewDetails(user.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mr-2 bg-gray-200 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={users.length < usersPerPage}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default UsersView;
