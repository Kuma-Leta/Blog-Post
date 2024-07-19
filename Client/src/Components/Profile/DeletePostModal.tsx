import React from "react";
import api from "../../axiosConfig";

interface DeletePostModalProps {
  postId: string;
  onDeleteSuccess: () => void;
  onCancel: () => void;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  postId,
  onDeleteSuccess,
  onCancel,
}) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/post/deletePost/${postId}`);
      onDeleteSuccess();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this post?</p>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
