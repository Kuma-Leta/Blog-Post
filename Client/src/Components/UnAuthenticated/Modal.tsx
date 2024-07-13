import React from "react";
import { CSSTransition } from "react-transition-group";
import { FaUser, FaStar, FaCalendarAlt, FaTag } from "react-icons/fa";
import "./modal.css";

interface Post {
  _id: string;
  title: string;
  textContent: string;
  imagePath: string;
  postedAt: string;
  createdAt: string;
  category: string;
  author: string;
  authorImage: string;
  ratingQuantity: number;
  averageRating: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, post }) => {
  if (!post) return null;

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] overflow-auto relative transform transition-transform duration-300 ease-in-out">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
          >
            &times;
          </button>
          <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
          {post.imagePath && (
            <img
              src={`http://localhost:5000/${post.imagePath}`}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}
          <div className="flex items-center mb-4">
            <FaUser className="text-purple-500 mr-2" />
            <p className="text-gray-700 font-semibold">{post.author}</p>
          </div>
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-purple-500 mr-2" />
            <p className="text-gray-700">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <FaTag className="text-purple-500 mr-2" />
            <p className="text-gray-700">{post.category}</p>
          </div>
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-500 mr-2" />
            <p className="text-gray-700">
              {post.averageRating} ({post.ratingQuantity} ratings)
            </p>
          </div>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">
            {post.textContent}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
