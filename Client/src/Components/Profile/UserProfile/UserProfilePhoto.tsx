/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IconType } from "react-icons";

import maleDefault from "../../../../public/john_doe.png";
import femaleDefault from "../../../../public/jane_smith.png";

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

  // / Determine the source URL for the user's photo or default image
  const photoSrc = currentUser?.photo
    ? `http://localhost:5000/${currentUser.photo}`
    : currentUser.gender === "female"
    ? femaleDefault
    : maleDefault;

  return (
    <form onSubmit={(e) => handleSubmit(e, "photo")} className="px-6 py-4">
      <div className={`mb-4 ${gradientBg} rounded-lg p-4 relative`}>
        <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center justify-between">
          <span className="flex items-center text-white">
            <Icon className="mr-2 text-white" />
          </span>
          {editField !== "photo" && (
            <button
              type="button"
              onClick={() => handleEdit("photo")}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-1 px-3 rounded-full shadow-md transition duration-300 disabled:opacity-50"
              style={{ minWidth: "100px", zIndex: 10 }}
            >
              Change Photo
            </button>
          )}
        </label>
        <div className="flex justify-center">
          <img
            src={photoSrc}
            alt="User Avatar"
            className="h-32 w-32 rounded-full mx-auto mt-4"
          />
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
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-1 px-3 mt-2 rounded-full shadow-md transition duration-300 disabled:opacity-50"
              style={{ minWidth: "100px", zIndex: 10 }}
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
