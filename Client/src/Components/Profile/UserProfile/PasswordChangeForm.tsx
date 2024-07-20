/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface PasswordChangeFormProps {
  currentUser: any;
  editField: string | null;
  handleEdit: (field: string | null) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent, field: string) => void;
  formData: any;
  fieldErrors: Record<string, string | null>;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  handleChange,
  handleSubmit,
  handleEdit,
  formData,
  fieldErrors,
}) => (
  <form onSubmit={(e) => handleSubmit(e, "password")} className="px-6 py-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Old Password
      </label>
      <input
        type="password"
        name="oldPassword"
        value={formData.oldPassword || ""}
        onChange={handleChange}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          fieldErrors.oldPassword ? "border-red-500" : ""
        }`}
        required
      />
      {fieldErrors.oldPassword && (
        <p className="text-red-500 text-xs italic">{fieldErrors.oldPassword}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        New Password
      </label>
      <input
        type="password"
        name="newPassword"
        value={formData.newPassword || ""}
        onChange={handleChange}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          fieldErrors.newPassword ? "border-red-500" : ""
        }`}
        required
      />
      {fieldErrors.newPassword && (
        <p className="text-red-500 text-xs italic">{fieldErrors.newPassword}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Confirm New Password
      </label>
      <input
        type="password"
        name="passwordConfirm"
        value={formData.passwordConfirm || ""}
        onChange={handleChange}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          fieldErrors.passwordConfirm ? "border-red-500" : ""
        }`}
        required
      />
      {fieldErrors.passwordConfirm && (
        <p className="text-red-500 text-xs italic">
          {fieldErrors.passwordConfirm}
        </p>
      )}
    </div>
    <div className="flex items-center justify-between">
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-1 px-3 mt-2 rounded-full shadow-md transition duration-300 disabled:opacity-50"
        style={{ minWidth: "100px" }}
      >
        Save
      </button>
      <button
        type="button"
        onClick={() => handleEdit(null)}
        className="text-gray-500 hover:text-gray-800"
      >
        Cancel
      </button>
    </div>
  </form>
);

export default PasswordChangeForm;
