import React from "react";

interface UserProfilePhotoProps {
  currentUser: any;
  editField: string | null;
  handleEdit: (field: string) => void;
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent, field: string) => void;
}

const UserProfilePhoto: React.FC<UserProfilePhotoProps> = ({
  currentUser,
  editField,
  handleEdit,
  handlePhotoChange,
  handleSubmit,
}) => (
  <form onSubmit={(e) => handleSubmit(e, "photo")} className="px-6 py-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Profile Picture
      </label>
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
);

export default UserProfilePhoto;
