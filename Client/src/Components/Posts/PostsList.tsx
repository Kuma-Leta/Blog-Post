import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../PostCard";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

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

const categories = [
  "All",
  "AI",
  "Software Development",
  "Cloud Computing",
  "Data Science",
  "Blockchain",
  "Internet of Things (IoT)",
  "DevOps",
  "Quantum Computing",
  "Cybersecurity",
];

const sortOptions = [
  { label: "Date", value: "date" },
  { label: "Rating", value: "rating" },
  { label: "Category", value: "category" },
  { label: "Title", value: "title" },
];

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("date");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] =
    useState<boolean>(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const postListRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize state from URL parameters
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category") || "All";
    const sortParam = params.get("sort") || "date";
    const pageParam = parseInt(params.get("page") || "1", 10);
    const searchParam = params.get("search") || "";

    setSelectedCategory(categoryParam);
    setSort(sortParam);
    setCurrentPage(pageParam);
    setSearchQuery(searchParam);

    // Fetch posts based on URL parameters
    const fetchPostsFromUrl = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/v1/post/getAllposts?page=${pageParam}&limit=9`;
        if (categoryParam !== "All") {
          url += `&category=${categoryParam}`;
        }
        url += `&sort=${sortParam}`;
        if (searchParam) {
          url += `&search=${encodeURIComponent(searchParam)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data.data);
        setTotalPages(Math.ceil(data.totalPosts / 9));
        setLoading(false);
        scrollToTop(); // Scroll to top after setting posts
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPostsFromUrl();

    // Scroll to top or post list section based on URL parameters
    if (!location.search) {
      scrollToTop();
    } else {
      scrollToPostList();
    }
  }, [location.search]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/api/v1/post/getAllposts?page=${currentPage}`;
      if (selectedCategory !== "All") {
        url += `&category=${selectedCategory}`;
      }
      url += `&sort=${sort}`;
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setPosts(data.data);
      setTotalPages(Math.ceil(data.totalPosts / 9));
      setLoading(false);
      scrollToTop(); // Scroll to top after setting posts
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const updateUrlParams = (category: string, sort: string, page: number) => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    params.set("sort", sort);
    params.set("page", page.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    navigate({
      search: params.toString(),
    });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    updateUrlParams(selectedCategory, sort, pageNumber);
    scrollToTop(); // Scroll to top after updating posts
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateUrlParams(category, sort, 1);
    setIsCategoryDropdownOpen(false);
  };

  const handleSortChange = (sortOption: string) => {
    setSort(sortOption);
    setCurrentPage(1);
    updateUrlParams(selectedCategory, sortOption, 1);
    setIsSortDropdownOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchPosts();
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`bg-white border border-purple-500 text-purple-500 py-2 px-4 rounded-full shadow-md transition duration-300 ${
            currentPage === i
              ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600"
              : "hover:bg-purple-500 hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToPostList = () => {
    if (postListRef.current) {
      postListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={postListRef} className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-1 space-y-4 md:space-y-0 md:space-x-8 w-full">
          <div className="relative w-full">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-bold">Categories:</span>
              <button
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-4 py-2 rounded-full w-full text-left flex justify-between items-center shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
              >
                {selectedCategory}{" "}
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    isCategoryDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
            {isCategoryDropdownOpen && (
              <ul className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto border border-gray-300 transition duration-300">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`block w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white transition duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative w-full">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-bold">Sort by:</span>
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-4 py-2 rounded-full w-full text-left flex justify-between items-center shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
              >
                {sort}{" "}
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    isSortDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
            {isSortDropdownOpen && (
              <ul className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto border border-gray-300 transition duration-300">
                {sortOptions.map((option, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSortChange(option.value)}
                      className={`block w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white transition duration-300 ${
                        sort === option.value
                          ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center space-x-4 w-full md:w-auto"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search posts..."
            className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-full"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-4 py-2 rounded-full shadow-md transition duration-300"
          >
            <FaSearch className="w-5 h-5" />
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <ClipLoader color="#6B46C1" loading={loading} size={35} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-8 space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600"
                } px-4 py-2 rounded-full shadow-md transition duration-300`}
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              {renderPageNumbers()}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600"
                } px-4 py-2 rounded-full shadow-md transition duration-300`}
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostsList;
