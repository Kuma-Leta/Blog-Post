import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import { BASE_URL } from "../../config";

interface Post {
  _id: string;
  title: string;
  textContent: string;
  imagePath: string;
}

const PostsView: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] =
    useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchPosts = async (page: number = 1) => {
    try {
      const response = await api.get(`/admin/getAllposts`, {
        params: { page },
      });
      setPosts(response.data.data);
      setTotalPages(Math.ceil(response.data.totalPosts / 9)); // Assuming 9 posts per page
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setIsConfirmDeleteOpen(false);
    setPostToDelete(null);
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await api.delete(`/admin/deletePost/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
      handleCloseModal(); // Close modals after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const confirmDelete = (postId: string) => {
    setPostToDelete(postId);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (postToDelete) {
      handleDeletePost(postToDelete);
    }
  };

  const handleIsConfirmDeleteOpen = () => {
    setIsConfirmDeleteOpen(false);
  };

  return (
    <div className="flex-1 p-8 bg-gray-200 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Posts Overview</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              <img
                src={`${BASE_URL}/${post.imagePath}`}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600">
                  {post.textContent.length > 100
                    ? `${post.textContent.substring(0, 100)}...`
                    : post.textContent}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center">
          <nav className="flex">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`mx-1 px-4 py-2 rounded-full border border-purple-500 ${
                    currentPage === page
                      ? "bg-purple-500 text-white"
                      : "bg-white text-purple-500"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Post Detail Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-gray-900 opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full z-10 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {selectedPost.title}
            </h2>
            <img
              src={`${BASE_URL}/${selectedPost.imagePath}`}
              alt={selectedPost.title}
              className="w-full h-60 object-cover mb-4"
            />
            {selectedPost.textContent.split("\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4">
                {paragraph}
              </p>
            ))}
            <button
              onClick={() => confirmDelete(selectedPost._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
            >
              Delete Post
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-gray-900 opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full z-10 relative">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Are you sure you want to delete this post?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleIsConfirmDeleteOpen}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsView;
