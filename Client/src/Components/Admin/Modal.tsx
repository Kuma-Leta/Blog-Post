import React from "react";

interface User {
  name: string;
  email: string;
  role: string;
  gender: string;
  createdAt: string;
  numberOfPost: number;
}

interface ModalProps {
  user: User | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ user, onClose }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="purple"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <div className="space-y-4">
          <div>
            <strong>Name:</strong> {user.name}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Role:</strong> {user.role}
          </div>
          <div>
            <strong>Gender:</strong> {user.gender}
          </div>
          <div>
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Number of Posts:</strong> {user.numberOfPost}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
