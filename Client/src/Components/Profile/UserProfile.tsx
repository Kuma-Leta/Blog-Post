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

const UserProfile: React.FC = () => {
  const { user: currentUser, setUser: setCurrentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>(
    {
      newPassword: null,
      passwordConfirm: null,
    }
  );

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

    // Clear field error when user starts typing
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData({ ...formData, photo: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e: React.FormEvent, field: string) => {
    e.preventDefault();
    setError(null);

    if (field === "password") {
      const { newPassword, passwordConfirm } = formData;
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
    } catch (error) {
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
        data = { name: formData.name };
        break;
      case "email":
        endpoint += "updateEmail";
        data = { email: formData.email };
        break;
      case "password":
        endpoint += "updatePassword";
        data = {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          passwordConfirm: formData.passwordConfirm,
        };
        break;
      case "photo":
        endpoint += "changePhoto";
        data = new FormData();
        data.append("photo", formData.photo);
        break;
      default:
        throw new Error("Invalid field");
    }

    return { endpoint, data };
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <NavbarLoggedIn />
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          User Profile
        </h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading user data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : currentUser ? (
          <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg border border-gray-300">
            {successMessage && (
              <SuccessMessage
                message={successMessage}
                onClose={() => setSuccessMessage(null)}
              />
            )}
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
                formData={formData}
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
            <UserProfilePhoto
              currentUser={currentUser}
              editField={editField}
              handleEdit={handleEdit}
              handlePhotoChange={handlePhotoChange}
              handleSubmit={handleSubmit}
              icon={FaCamera} // Add this line
            />
            <UserPosts posts={currentUser.posts} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserProfile;
