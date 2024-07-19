/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../PostCard";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

import { BASE_URL } from "../../config";
import api from "../../axiosConfig";

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
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category") || "All";
    const sortParam = params.get("sort") || "date";
    const pageParam = parseInt(params.get("page") || "1", 10);
    const searchParam = params.get("search") || "";

    setSelectedCategory(categoryParam);
    setSort(sortParam);
    setCurrentPage(pageParam);
    setSearchQuery(searchParam);

    const fetchPostsFromUrl = async () => {
      setLoading(true);
      try {
        let url = `/post/getAllposts?page=${pageParam}&limit=9`;
        if (categoryParam !== "All") {
          url += `&category=${categoryParam}`;
        }
        url += `&sort=${sortParam}`;
        if (searchParam) {
          url += `&search=${encodeURIComponent(searchParam)}`;
        }
        const response = await api.get(url);
        const data = await response.data;
        setPosts(data.data);
        setTotalPages(Math.ceil(data.totalPosts / 9));
        setLoading(false);
        scrollToTop();
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPostsFromUrl();

    if (!location.search) {
      scrollToTop();
    } else {
      scrollToPostList();
    }
  }, [location.search]);

  const updateUrlParams = (
    category: string,
    sort: string,
    page: number,
    search: string
  ) => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    params.set("sort", sort);
    params.set("page", page.toString());
    if (search) {
      params.set("search", search);
    }
    navigate({
      search: params.toString(),
    });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    updateUrlParams(selectedCategory, sort, pageNumber, searchQuery);
    scrollToTop();
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
    updateUrlParams(category, sort, 1, searchQuery);
    setIsCategoryDropdownOpen(false);
  };

  const handleSortChange = (sortOption: string) => {
    setSort(sortOption);
    setCurrentPage(1);
    updateUrlParams(selectedCategory, sortOption, 1, searchQuery);
    setIsSortDropdownOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1);
    updateUrlParams(selectedCategory, sort, 1, searchQuery);
    setSearchQuery("");
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
              <div className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-300">
                <ul className="py-2">
                  {categories.map((category) => (
                    <li
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`cursor-pointer px-4 py-2 ${
                        selectedCategory === category
                          ? "bg-purple-500 text-white"
                          : "text-gray-800 hover:bg-purple-500 hover:text-white"
                      } transition duration-300`}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative w-full">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-bold">Sort by:</span>
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-4 py-2 rounded-full w-full text-left flex justify-between items-center shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
              >
                {sortOptions.find((option) => option.value === sort)?.label}{" "}
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
              <div className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-300">
                <ul className="py-2">
                  {sortOptions.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`cursor-pointer px-4 py-2 ${
                        sort === option.value
                          ? "bg-purple-500 text-white"
                          : "text-gray-800 hover:bg-purple-500 hover:text-white"
                      } transition duration-300`}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full md:w-1/2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-md"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="flex justify-center items-center w-full col-span-3">
            <ClipLoader color="#9333ea" loading={loading} size={50} />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex justify-center items-center w-full col-span-3">
            <p className="text-gray-500">No posts found.</p>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
      <div className="mt-8 flex justify-center items-center space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-white border border-purple-500 text-purple-500 py-2 px-4 rounded-full shadow-md hover:bg-purple-500 hover:text-white transition duration-300"
        >
          <FaChevronLeft />
        </button>
        <div className="flex space-x-2">{renderPageNumbers()}</div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-white border border-purple-500 text-purple-500 py-2 px-4 rounded-full shadow-md hover:bg-purple-500 hover:text-white transition duration-300"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PostsList;
