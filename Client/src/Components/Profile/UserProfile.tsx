import React, { useEffect, useState } from "react";
import NavbarLoggedIn from "../AuthenticatedNavbar";
import axios from "axios";
import { useUser } from "../../UserContext"; // Assuming this is the path to your UserContext

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  numberOfPost: number;
  role: string;
  posts: any[];
}

const UserProfile: React.FC = () => {
  const { user: currentUser, setUser: setCurrentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.get(
        "http://localhost:5000/api/v1/users/me",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(response.data.data);

      setCurrentUser(response.data.data.data); // Update user context
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data");
      setLoading(false);
    }
  };

  const handleEdit = (field: string) => {
    setEditField(field);
    setFormData({ ...currentUser });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData({ ...formData, photo: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e: React.FormEvent, field: string) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      let endpoint = "http://localhost:5000/api/v1/users/";
      let data: any = {};

      if (field === "name") {
        endpoint += "changeName";
        data = { name: formData.name };
      } else if (field === "email") {
        endpoint += "updateEmail";
        data = { email: formData.email };
      } else if (field === "password") {
        endpoint += "updatePassword";
        data = { password: formData.password };
      } else if (field === "photo") {
        endpoint += "changePhoto";
        data = new FormData();
        data.append("photo", formData.photo);
      }

      const response = await axios.patch(endpoint, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          ...(field === "photo" && { "Content-Type": "multipart/form-data" }),
        },
      });

      setSuccessMessage(
        `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } updated successfully!`
      );
      setEditField(null);
      await fetchUserData(); // Refetch the user data to refresh the profile
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Failed to update user data");
    }
  };

  return (
    <div>
      <NavbarLoggedIn />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4 text-center">User Profile</h2>
        {loading ? (
          <p>Loading user data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : currentUser ? (
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            {successMessage && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline">{successMessage}</span>
                <button
                  onClick={() => setSuccessMessage(null)}
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                >
                  <span className="text-xl">&times;</span>
                </button>
              </div>
            )}
            <form
              onSubmit={(e) => handleSubmit(e, "name")}
              className="px-6 py-4"
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                {editField === "name" ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <p>{currentUser.name}</p>
                    <button
                      type="button"
                      onClick={() => handleEdit("name")}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </form>
            <form
              onSubmit={(e) => handleSubmit(e, "email")}
              className="px-6 py-4"
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                {editField === "email" ? (
                  <>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <p>{currentUser.email}</p>
                    <button
                      type="button"
                      onClick={() => handleEdit("email")}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </form>
            <form
              onSubmit={(e) => handleSubmit(e, "password")}
              className="px-6 py-4"
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                {editField === "password" ? (
                  <>
                    <input
                      type="password"
                      name="password"
                      value={formData.password || ""}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <p>********</p>
                    <button
                      type="button"
                      onClick={() => handleEdit("password")}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </form>
            <form
              onSubmit={(e) => handleSubmit(e, "photo")}
              className="px-6 py-4"
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Picture
                </label>
                {currentUser.photo ? (
                  <img
                    src={currentUser.photo}
                    alt="User Avatar"
                    className="h-32 w-32 rounded-full mx-auto mt-4"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full mx-auto mt-4 bg-gray-200 flex items-center justify-center">
                    No Photo
                  </div>
                )}
                {editField === "photo" ? (
                  <>
                    <input
                      type="file"
                      name="photo"
                      onChange={handlePhotoChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleEdit("photo")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                  >
                    Change Photo
                  </button>
                )}
              </div>
            </form>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Posts</div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {currentUser.posts.map((post, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded shadow">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-gray-700">{post.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserProfile;
