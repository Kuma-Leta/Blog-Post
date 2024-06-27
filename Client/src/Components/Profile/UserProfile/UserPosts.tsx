import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
    setVisiblePostsCount((prevCount) => prevCount + 3);
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
          <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
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
            {(post.imagePath && post.imagePath.includes(",")) ||
            post.videoContent ? (
              <Carousel showThumbs={false}>
                {post.imagePath &&
                  post.imagePath.split(",").map((image, idx) => (
                    <div key={idx} className="h-32">
                      <img
                        src={`http://localhost:5000/${image
                          .trim()
                          .replace(/\\/g, "/")}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                {post.videoContent && (
                  <div className="h-32">
                    <video
                      controls
                      className="w-full h-full object-cover"
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
                  </div>
                )}
              </Carousel>
            ) : (
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
            )}

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
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </Link>
                <div>
                  <button
                    onClick={() => handleEdit(post._id)}
                    className="bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setPostToDelete(post._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
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
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(postToDelete)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAllPosts}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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
