import React, { useState, useEffect } from "react";
import PostCard from "../PostCard";

interface Post {
  _id: string;
  title: string;
  author: string;
  textContent: string;
  imagePath: string;
  postedAt: string;
}

interface PostsListProps {
  selectedCategory: string | null;
}

const PostsList: React.FC<PostsListProps> = ({ selectedCategory }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 6; // Posts per page

  useEffect(() => {
    fetchPosts();
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1); // Reset page when selected category changes
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/api/v1/post/getAllposts?page=${currentPage}&limit=${limit}`;
      if (selectedCategory && selectedCategory !== "All") {
        url += `&category=${selectedCategory}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        console.log(data.data.data);
        setPosts(data.data.data);
        setHasMore(data.data.data.length === limit);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
      } else {
        console.error("Error fetching posts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadPreviousPosts = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const loadNextPosts = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.length === 0 && !loading && (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={loadPreviousPosts}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 mr-2"
          disabled={currentPage === 1 || loading}
        >
          Previous
        </button>
        <button
          onClick={loadNextPosts}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
          disabled={!hasMore || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostsList;
