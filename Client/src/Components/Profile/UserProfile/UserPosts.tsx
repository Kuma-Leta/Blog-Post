import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";

import axios from "axios";
import SuccessMessage from "./SuccessMessage";

interface Post {
  _id: string;
  title: string;
  author: string;
  category: string;
  createdAt: string;
  averageRating: number;
  textContent: string;
  imagePath: string;
  videoContent?: string;
}

interface UserPostsProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const UserPosts: React.FC<UserPostsProps> = ({ posts, setPosts }) => {
  const [visiblePostsCount, setVisiblePostsCount] = useState(2);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const navigate = useNavigate();

  const handleLoadMore = () => {
    setVisiblePostsCount((prevCount) => prevCount + 2);
  };

  const handleEdit = (postId: string) => {
    navigate(`/profile/editPost/${postId}`);
  };

  const handleDelete = async (postId: string) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `http://localhost:5000/api/v1/post/deletePost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      setSuccessMessage("Post deleted successfully!");
      setPostToDelete(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error deleting post:", error.response.data);
      } else {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleDeleteAllPosts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete("http://localhost:5000/api/v1/post/deleteAllMyPost", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts([]);
      setSuccessMessage("All posts deleted successfully!");
      setConfirmDeleteAll(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error deleting all posts:", error.response.data);
      } else {
        console.error("Error deleting all posts:", error);
      }
    }
  };

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="px-6 py-8 bg-gray-100 min-h-screen">
      <div className="font-bold text-3xl text-center mb-8 text-gray-800">
        Posts
      </div>

      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <Link to="/profile/addPost">
          <button
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-md transition duration-300 disabled:opacity-50"
            style={{ minWidth: "120px" }}
          >
            Create Post
          </button>
        </Link>
        <button
          onClick={() => setConfirmDeleteAll(true)}
          className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Delete All Posts
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {sortedPosts.slice(0, visiblePostsCount).map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 w-full sm:w-auto"
          >
            {post.imagePath || post.videoContent ? (
              <>
                {post.imagePath && (
                  <img
                    src={`http://localhost:5000/${post.imagePath.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={post.title}
                    className="w-full h-32 object-cover"
                  />
                )}
                {post.videoContent && (
                  <video
                    controls
                    className="w-full h-32 object-cover"
                    style={{ outline: "none" }}
                  >
                    <source
                      src={`http://localhost:5000/${post.videoContent.replace(
                        /\\/g,
                        "/"
                      )}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
              </>
            ) : null}

            <div className="p-6">
              <h3 className="font-bold text-2xl mb-2 text-gray-800 truncate-title">
                {post.title}
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{`By you`}</span>
                <span className="text-sm text-gray-500">{`Category: ${post.category}`}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="text-sm text-yellow-500">{`⭐ ${post.averageRating}`}</span>
              </div>
              <p className="text-gray-700 mb-4 truncate-content">
                {post.textContent.substring(0, 100)}...
              </p>
              <div className="flex justify-between">
                <Link
                  to={`/post/${post._id}`}
                  className="text-purple-500 hover:underline"
                >
                  Read More
                </Link>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(post._id)}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-1 px-3 rounded-full shadow-md transition duration-300 disabled:opacity-50 flex  justify-center items-center"
                    style={{ minWidth: "100px" }}
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </button>

                  <button
                    onClick={() => setPostToDelete(post._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center"
                    style={{ minWidth: "100px" }}
                  >
                    <FaTrash className="mr-1 " />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visiblePostsCount < posts.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-md transition duration-300 disabled:opacity-50"
            style={{ minWidth: "120px" }}
          >
            Load More
          </button>
        </div>
      )}

      {postToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setPostToDelete(null)}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 px-4 rounded-full hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(postToDelete)}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-full hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteAll && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete all posts?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setConfirmDeleteAll(false)}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 px-4 rounded-full hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAllPosts}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-full hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
