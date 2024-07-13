import React, { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Modal from "./Modal";

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

const LatestPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const limit = 9;

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/api/v1/post/getAllposts?page=${currentPage}&limit=${limit}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        const newPosts = data.data;

        // Check for and remove duplicates
        const filteredPosts = newPosts.filter(
          (newPost) => !posts.some((post) => post._id === newPost._id)
        );

        setPosts((prevPosts) => [...prevPosts, ...filteredPosts]);
        setHasMore(filteredPosts.length === limit);
      } else {
        console.error("Error fetching posts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post); // Set the selected post to be displayed in the modal
  };

  const handleCloseModal = () => {
    setSelectedPost(null); // Close the modal
  };

  return (
    <section id="latest-posts" className="py-16 bg-gray-100 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Posts</h2>
        {loading && currentPage === 1 ? (
          <div className="flex justify-center items-center">
            <ClipLoader size={50} color={"#6b21a8"} loading={loading} />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts available.</p>
              ) : (
                posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                    onClick={() => handlePostClick(post)} // Set the post when clicked
                  >
                    <img
                      src={`http://localhost:5000/${post.imagePath}`}
                      alt={post.title}
                      className="w-full h-40 object-cover rounded-t-lg mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>

                    <div className="flex items-center mb-2 text-gray-600">
                      <FaTag className="text-purple-500 mr-2" />
                      <span>{post.category}</span>
                    </div>

                    <p className="text-gray-700">
                      {post.textContent.substring(0, 100)}...
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePostClick(post);
                      }}
                      className="text-blue-500 hover:underline mt-4"
                    >
                      Read more
                    </button>
                  </div>
                ))
              )}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-md transition duration-300 disabled:opacity-50"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}

        {selectedPost && (
          <Modal isOpen={true} onClose={handleCloseModal} post={selectedPost} />
        )}
      </div>
    </section>
  );
};

export default LatestPosts;
