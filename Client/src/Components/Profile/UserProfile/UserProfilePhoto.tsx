import React from "react";
import { IconType } from "react-icons";

interface UserProfilePhotoProps {
  currentUser: any;
  editField: string | null;
  handleEdit: (field: string) => void;
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent, field: string) => void;
  icon: IconType;
}

const UserProfilePhoto: React.FC<UserProfilePhotoProps> = ({
  currentUser,
  editField,
  handleEdit,
  handlePhotoChange,
  handleSubmit,
  icon: Icon,
}) => {
  const gradientBg = "bg-gradient-to-b from-blue-400 to-indigo-500"; // Define your gradient colors here

  return (
    <form onSubmit={(e) => handleSubmit(e, "photo")} className="px-6 py-4">
      <div className={`mb-4 ${gradientBg} rounded-lg p-4 relative`}>
        <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center justify-between">
          <span className="flex items-center text-white">
            <Icon className="mr-2 text-white" />
            Profile Picture
          </span>
          {editField !== "photo" && (
            <button
              type="button"
              onClick={() => handleEdit("photo")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{ zIndex: 10 }} // Ensure button is above other elements for correct hover detection
            >
              Change Photo
            </button>
          )}
        </label>
        <div className="flex justify-center">
          {currentUser.photo ? (
            <img
              src={`http://localhost:5000/${currentUser?.photo}`}
              alt="User Avatar"
              className="h-32 w-32 rounded-full mx-auto mt-4"
            />
          ) : (
            <div className="h-32 w-32 rounded-full mx-auto mt-4 bg-gray-200 flex items-center justify-center">
              No Photo
            </div>
          )}
        </div>
        {editField === "photo" && (
          <>
            <input
              type="file"
              name="photo"
              onChange={handlePhotoChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 absolute top-0 right-0 mr-4 mt-2"
              style={{ zIndex: 10 }} // Ensure button is above other elements for correct hover detection
            >
              Save
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default UserProfilePhoto;
