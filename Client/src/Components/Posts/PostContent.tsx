import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { Post } from "./PostDetail"; // Adjust the import based on your directory structure

interface PostContentProps {
  post: Post;
  isAuthor: boolean;
  handleEdit: (postId: string) => void;
  setPostToDelete: (postId: string | null) => void;
}

const PostContent: React.FC<PostContentProps> = ({
  post,
  isAuthor,
  handleEdit,
  setPostToDelete,
}) => {
  const useCarousel =
    (post.imagePath && post.videoContent) ||
    (post.imagePath && post.imagePath.includes(",")) ||
    (post.videoContent && post.imagePath);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <BsStarFill key={i} className="text-yellow-400" />
          ))}
        {halfStars === 1 && <BsStarHalf className="text-yellow-400" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <BsStar key={i} className="text-yellow-400" />
          ))}
      </>
    );
  };

  return (
    <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
      {useCarousel ? (
        <Carousel showThumbs={false} showStatus={false}>
          {post.imagePath &&
            post.imagePath.split(",").map((image, index) => (
              <div key={index} className="relative w-full h-80">
                <img
                  src={`http://localhost:5000/${image.trim()}`}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-contain rounded-lg mb-4 shadow-lg"
                />
              </div>
            ))}
          {post.videoContent && (
            <div className="relative w-full h-80">
              <video
                controls
                className="absolute inset-0 w-full h-full object-contain rounded-lg mb-4 shadow-lg"
                style={{ outline: "none" }}
              >
                <source
                  src={`http://localhost:5000/${post.videoContent}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </Carousel>
      ) : (
        <div className="relative w-full h-80 mb-4">
          {post.imagePath && (
            <img
              src={`http://localhost:5000/${post.imagePath}`}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-contain rounded-lg shadow-lg"
            />
          )}
          {post.videoContent && (
            <video
              controls
              className="absolute inset-0 w-full h-full object-contain rounded-lg mb-4 shadow-lg"
              style={{ outline: "none" }}
            >
              <source
                src={`http://localhost:5000/${post.videoContent}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
      <p className="text-gray-600 mb-4">{post.textContent}</p>
      <div className="flex items-center justify-between border-t pt-4 mt-4">
        <div className="flex items-center">
          <img
            src={`http://localhost:5000/${post.authorImage}`}
            alt={post.author}
            className="h-10 w-10 rounded-full object-cover mr-2"
          />
          <p className="text-gray-700">{post.author}</p>
        </div>
        <div className="flex items-center">
          <p className="text-gray-600 mr-2">Category:</p>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="flex items-center justify-between border-t pt-4 mt-4">
        <div className="flex items-center">
          <p className="text-gray-600 mr-2">Rating:</p>
          <div className="flex items-center">
            {renderStars(post.averageRating)}
            <span className="text-gray-600 ml-2">
              ({post.ratingQuantity} ratings)
            </span>
          </div>
        </div>
        {isAuthor && (
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleEdit(post._id)}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-1 px-3 rounded-full shadow-md transition duration-300 disabled:opacity-50 flex items-center justify-center"
              style={{ minWidth: "100px" }}
            >
              <FaEdit className="mr-1" />
              Edit
            </button>

            <button
              type="button"
              onClick={() => setPostToDelete(post._id)}
              className="bg-red-500 hover:from-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white py-1 px-3 rounded-full shadow-md transition duration-300 disabled:opacity-50 flex items-center justify-center"
              style={{ minWidth: "100px" }}
            >
              <FaTrash className="mr-1 " />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostContent;
