import React, { useState } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaTag,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import moment from "moment";

interface Post {
  _id: string;
  title: string;
  textContent: string;
  imagePath?: string; // Make imagePath and videoContent optional
  videoContent?: string;
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
  post: Post | null; // Ensure post can be null
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, post }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  if (!post) return null; // Handle case where post is null or undefined

  // Create an array of media items based on presence of imagePath and videoContent
  const mediaItems = [
    ...(post.imagePath ? [{ type: "image", src: post.imagePath }] : []),
    ...(post.videoContent ? [{ type: "video", src: post.videoContent }] : []),
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="relative bg-white rounded-lg w-11/12 max-w-3xl overflow-auto max-h-full p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 mb-10"
        >
          <FaTimes className="text-red-600 " size={24} />
        </button>

        <div className=" mb-10">
          <div className="flex justify-center items-center mb-2 text-gray-600">
            <FaChevronLeft
              onClick={handlePrev}
              className="cursor-pointer text-xl mr-4 text-purple-700"
            />
            <div>
              {mediaItems.length > 0 && (
                <>
                  {mediaItems[currentIndex].type === "image" ? (
                    <img
                      src={`http://localhost:5000/${mediaItems[currentIndex].src}`}
                      alt={post.title}
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  ) : (
                    <video
                      src={`http://localhost:5000/${mediaItems[currentIndex].src}`}
                      controls
                      className="w-full h-auto max-h-96"
                    ></video>
                  )}
                </>
              )}
            </div>
            <FaChevronRight
              onClick={handleNext}
              className="cursor-pointer text-xl ml-4 text-purple-700"
            />
          </div>
        </div>

        <div className="p-4 text-left">
          <h3 className="text-xl font-semibold mb-2">Post Details</h3>
          <p className="text-gray-700 mb-4">{post.textContent}</p>
          <div className="flex items-center text-gray-600 mb-2">
            <FaUser className="mr-2 text-purple-700" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <FaTag className="mr-2 text-purple-700" />
            <span>{post.category}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2 text-purple-700" />
            <span>{moment(post.postedAt).format("MMMM Do YYYY")}</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
