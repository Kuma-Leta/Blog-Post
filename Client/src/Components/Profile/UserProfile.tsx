/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import NavbarLoggedIn from "../AuthenticatedNavbar";
import axios from "axios";
import { useUser } from "../../UserContext";
import UserProfileField from "./UserProfile/UserProfileField";
import UserProfilePhoto from "./UserProfile/UserProfilePhoto";
import UserPosts from "./UserProfile/UserPosts";
import SuccessMessage from "./UserProfile/SuccessMessage";
import PasswordChangeForm from "./UserProfile/PasswordChangeForm";
import { FaUser, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";

export interface User {
  _id: string;
  title: string;
  author: string;
  textContent: string;
  imagePath?: string;
  createdAt: string;
  category: string;
  authorImage: string;
  ratingQuantity: number;
  averageRating: number;
  videoContent?: string;
  gender: "male" | "female";
}

export interface Post {
  _id: string;
  title: string;
  author: string;
  textContent: string;
  imagePath?: string;
  createdAt: string;
  category: string;
  authorImage: string;
  ratingQuantity: number;
  averageRating: number;
  videoContent?: string;
}

const UserProfile: React.FC = () => {
  const { user: currentUser, setUser: setCurrentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User> | null | any>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>(
    {
      newPassword: null,
      passwordConfirm: null,
    }
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // State for posts
  const [posts, setPosts] = useState<Post[] | any>([]);

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

      setCurrentUser(response.data.data.data); // Update user context
      setPosts(response.data.data.data.posts); // Set posts state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data");
      setLoading(false);
    }
  };

  const handleEdit = (field: string | null) => {
    setEditField(field);
    setFormData({ ...currentUser });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Clear field error when user starts typing
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        photo: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent, field: string) => {
    e.preventDefault();
    setError(null);

    if (field === "password") {
      const { newPassword, passwordConfirm } = formData as {
        newPassword: string;
        passwordConfirm: string;
      };
      if (!newPassword || newPassword.length < 8) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          newPassword: "New password must be at least 8 characters long.",
        }));
        return;
      }
      if (newPassword !== passwordConfirm) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          passwordConfirm:
            "New password and password confirmation do not match.",
        }));
        return;
      }
    }

    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const { endpoint, data } = getEndpointAndData(field);

      const response = await axios.patch(endpoint, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          ...(field === "photo" && { "Content-Type": "multipart/form-data" }),
        },
      });

      console.log(response);

      if (field === "password") {
        localStorage.removeItem("authToken");
        setSuccessMessage(
          "Password changed successfully! Please log in again."
        );
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        setSuccessMessage(`${capitalize(field)} updated successfully!`);
        setEditField(null);
        await fetchUserData();
      }
    } catch (error: any) {
      console.error("Error updating user data:", error);
      if (
        field === "password" &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          oldPassword: error.response.data.message,
        }));
      } else {
        setError("Failed to update user data");
      }
    }
  };

  const getEndpointAndData = (field: string) => {
    let endpoint = "http://localhost:5000/api/v1/users/";
    let data: any = {};

    switch (field) {
      case "name":
        endpoint += "changeName";
        data = { name: formData?.name };
        break;
      case "email":
        endpoint += "updateEmail";
        data = { email: formData?.email };
        break;
      case "password":
        endpoint += "updatePassword";
        data = {
          oldPassword: formData?.oldPassword,
          newPassword: formData?.newPassword,
          passwordConfirm: formData?.passwordConfirm,
        };
        break;
      case "photo":
        endpoint += "changePhoto";
        data = new FormData();
        data.append("photo", formData?.photo as Blob);
        break;
      default:
        throw new Error("Invalid field");
    }

    return { endpoint, data };
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const handleDeleteAccount = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      // Hide the modal immediately after confirming
      setShowDeleteModal(false);

      await axios.delete("http://localhost:5000/api/v1/users/deleteMe", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      localStorage.removeItem("authToken");
      setSuccessMessage("Account deleted successfully!");
      setTimeout(() => {
        window.location.href = "/"; // Redirect to home page or login page
      }, 3000);
    } catch (error) {
      console.error("Error deleting account:", error);
      setError("Failed to delete account");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <NavbarLoggedIn />
      <div className="container mx-auto px-4 py-8 lg:px-8 flex flex-col lg:flex-row gap-8">
        <div className="max-w-md">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-300">
            <h2 className="text-3xl font-bold px-6 py-4 bg-gray-100 border-b border-gray-300">
              User Information
            </h2>
            <div className="px-4 py-2">
              <UserProfilePhoto
                currentUser={currentUser}
                editField={editField}
                handleEdit={handleEdit}
                handlePhotoChange={handlePhotoChange}
                handleSubmit={handleSubmit}
                icon={FaCamera}
              />

              <UserProfileField
                label="Name"
                field="name"
                type="text"
                icon={FaUser}
                currentUser={currentUser}
                editField={editField}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                error={null} // Replace with actual error handling if needed
              />
              <UserProfileField
                label="Email"
                field="email"
                type="email"
                icon={FaEnvelope}
                currentUser={currentUser}
                editField={editField}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                error={null} // Replace with actual error handling if needed
              />
              {editField === "password" ? (
                <PasswordChangeForm
                  currentUser={currentUser}
                  editField={editField}
                  handleEdit={handleEdit}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  formData={
                    formData as {
                      oldPassword: string;
                      newPassword: string;
                      passwordConfirm: string;
                    }
                  }
                  fieldErrors={fieldErrors}
                />
              ) : (
                <UserProfileField
                  label="Password"
                  field="password"
                  type="password"
                  icon={FaLock}
                  currentUser={currentUser}
                  editField={editField}
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleEdit={handleEdit}
                  error={fieldErrors.newPassword || fieldErrors.passwordConfirm}
                />
              )}
              <div className="mt-4">
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-8 text-center lg:text-left text-gray-800">
            User Posts
          </h2>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-300">
            {successMessage && (
              <SuccessMessage
                message={successMessage}
                onClose={() => setSuccessMessage(null)}
              />
            )}
            <UserPosts posts={posts} setPosts={setPosts} />
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
