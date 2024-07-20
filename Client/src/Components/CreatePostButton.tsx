import React from "react";
import { Link } from "react-router-dom";

const CreatePostButton: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <Link
        to="/profile/addPost"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
      >
        Create New Post
      </Link>
    </div>
  );
};
export default CreatePostButton;
