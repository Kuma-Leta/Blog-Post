import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Modal from "./Modal";
import Navbar from "./Navbar";

import { BASE_URL } from "../../config";
import api from "../../axiosConfig";

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

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const limit = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/post/getAllposts?category=${category}&limit=${limit}&page=${currentPage}`
        );
        const data = await response.data;
        console.log(data);
        if (response.status === 200) {
          const newPosts = data.data;
          if (Array.isArray(newPosts)) {
            setPosts((prevPosts = []) => {
              const uniquePosts = newPosts.filter(
                (newPost) => !prevPosts.some((post) => post._id === newPost._id)
              );
              return [...prevPosts, ...uniquePosts];
            });
            setHasMore(newPosts.length === limit);
          } else {
            console.error("Invalid data format received:", newPosts);
          }
        } else {
          console.error("Error fetching posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, currentPage]);

  const handleLoadMore = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <Navbar />
      <section
        id="category-posts"
        className="py-16 bg-gray-100 text-black mt-6"
      >
        <div className="container mx-auto px-4">
          <button
            className="flex items-center text-blue-500 hover:underline mb-8"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-center mb-8">
            Posts in {category}
          </h2>
          {loading && currentPage === 1 ? (
            <p className="text-center text-gray-500">Loading posts...</p>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {posts.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No posts available.
                  </p>
                ) : (
                  posts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                      onClick={() => handlePostClick(post)}
                    >
                      <img
                        src={`${BASE_URL}/${post.imagePath}`}
                        alt={post.title}
                        className="w-full h-40 object-cover rounded-t-lg mb-4"
                      />
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-700">
                        {post.textContent.substring(0, 100)}...
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePostClick(post);
                        }}
                        className="text-blue-500 hover:underline mt-4 block hover:text-blue-600"
                      >
                        Read more
                      </button>
                    </div>
                  ))
                )}
              </div>
              {hasMore && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleLoadMore}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-md transition duration-300 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "See More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <Modal
          isOpen={!!selectedPost}
          onClose={handleCloseModal}
          post={selectedPost}
        />
      </section>
    </>
  );
};

export default CategoryPage;
