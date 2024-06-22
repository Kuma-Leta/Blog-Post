import React from "react";
import { IconType } from "react-icons";

interface UserProfileFieldProps {
  label: string;
  field: string;
  type: string;
  icon: IconType; // Add this line
  currentUser: any;
  editField: string | null;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent, field: string) => void;
  handleEdit: (field: string | null) => void;
  error: string | null;
}

const UserProfileField: React.FC<UserProfileFieldProps> = ({
  label,
  field,
  type,
  icon: Icon, // Add this line
  currentUser,
  editField,
  formData,
  handleChange,
  handleSubmit,
  handleEdit,
  error,
}) => (
  <form onSubmit={(e) => handleSubmit(e, field)} className="px-6 py-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      {editField === field ? (
        <>
          <div className="flex items-center">
            <Icon className="mr-2 text-gray-500" />
            <input
              type={type}
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            Save
          </button>
        </>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Icon className="mr-2 text-blue-500" />
            <p>{currentUser[field]}</p>
          </div>
          <button
            type="button"
            onClick={() => handleEdit(field)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
        </div>
      )}
    </div>
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </form>
);

export default UserProfileField;
