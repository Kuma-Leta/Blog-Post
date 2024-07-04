import React, { useState, useEffect, useRef } from "react";
import PostCard from "../PostCard";

interface Post {
  _id: string;
  title: string;
  author: string;
  textContent: string;
  imagePath: string;
  postedAt: string;
  createdAt: string;
  category: string;
  authorImage: string;
  ratingQuantity: number;
  averageRating: number;
}

interface PostsListProps {
  selectedCategory: string | null;
  searchQuery: string;
  sortBy: string;
}

const PostsList: React.FC<PostsListProps> = ({
  selectedCategory,
  searchQuery,
  sortBy,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 6; // Posts per page
  const postListSection = document.getElementById("latest-posts");

  const postListRef = useRef<HTMLDivElement>(null); // Ref for the post list

  useEffect(() => {
    const fetchAndSortPosts = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/v1/post/getAllposts?limit=0&sort=newest`; // Fetch all posts sorted by newest
        if (selectedCategory && selectedCategory !== "All") {
          url += `&category=${selectedCategory}`;
        }
        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          let fetchedPosts = data.data.data;

          // Sort fetched posts based on selected criterion
          if (sortBy === "newest") {
            fetchedPosts.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          } else if (sortBy === "oldest") {
            fetchedPosts.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            );
          } else if (sortBy === "title") {
            fetchedPosts.sort((a, b) => a.title.localeCompare(b.title));
          } else if (sortBy === "category") {
            fetchedPosts.sort((a, b) => a.category.localeCompare(b.category));
          }
          // Set the sorted posts
          setPosts(fetchedPosts);

          // Calculate pagination
          const startIndex = (currentPage - 1) * limit;
          const slicedPosts = fetchedPosts.slice(
            startIndex,
            startIndex + limit
          );

          // Set posts to display on the current page
          setPosts(slicedPosts);
          setHasMore(fetchedPosts.length > slicedPosts.length);
        } else {
          console.error("Error fetching posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSortPosts();
  }, [selectedCategory, searchQuery, sortBy, currentPage]);

  const loadPreviousPosts = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setTimeout(() => {
        if (postListSection) {
          postListSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        // postListRef.current?.scrollIntoView({
        //   behavior: "smooth",
        //   block: "start",
        // });
      }, 100); // Adjust delay as needed
    }
  };

  const loadNextPosts = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
      setTimeout(() => {
        if (postListSection) {
          postListSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        // postListRef.current?.scrollIntoView({
        //   behavior: "smooth",
        //   block: "start",
        // });
      }, 100); // Adjust delay as needed
    }
  };

  return (
    <div id="latest-posts" className="container mx-auto py-8 px-4 md:px-0">
      <div ref={postListRef}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {posts.length === 0 && !loading && (
            <p className="text-center text-gray-500">No posts available.</p>
          )}
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={loadPreviousPosts}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-md transition duration-300 disabled:opacity-50"
            style={{ minWidth: "120px" }}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </button>
          <button
            onClick={loadNextPosts}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-md transition duration-300 disabled:opacity-50"
            style={{ minWidth: "120px" }}
            disabled={!hasMore || loading}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsList;
