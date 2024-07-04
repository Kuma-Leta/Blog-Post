import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./AuthenticatedNavbar";
import PostsList from "./Posts/PostsList";
import WelcomeSection from "./WelcomeSection";
import Footer from "./Footer";

const Homepage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "All"
  ); // Default to "All"
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] =
    useState<boolean>(false); // State for category dropdown
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false); // State for sort-by dropdown
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === "All" ? null : category);
    setIsCategoryDropdownOpen(false); // Close the dropdown after selecting a category
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
    setIsSortDropdownOpen(false); // Close the dropdown after selecting a sort option
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform search logic here, e.g., pass searchQuery to PostsList component
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Navbar />
      <WelcomeSection />
      <div className="container mx-auto py-8 px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center justify-between space-x-20 md:w-2/3 lg:w-1/2">
            <div className="relative w-full">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-bold">Categories:</span>
                <button
                  onClick={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                  className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold px-4 py-2 rounded-full w-full text-left flex justify-between items-center shadow-lg border border-gray-300 hover:from-purple-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
                >
                  {selectedCategory || "All"}{" "}
                  {/* Display selected category or "All" */}
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
                          selectedCategory === category ||
                          (category === "All" && selectedCategory === null)
                            ? "bg-gray-300 font-bold text-gray-900" // Highlight selected category
                            : "text-gray-700" // Default text color for other categories
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
                  className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold px-4 py-2 rounded-full w-full text-left flex justify-between items-center shadow-lg border border-gray-300 hover:from-purple-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
                >
                  {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}{" "}
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
                  {["newest", "oldest", "title", "category"].map(
                    (sortOption, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleSortChange(sortOption)}
                          className={`block w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white transition duration-300 ${
                            sortBy === sortOption
                              ? "bg-gray-300 font-bold text-gray-900" // Highlight selected sort option
                              : "text-gray-700" // Default text color for other options
                          }`}
                        >
                          {sortOption.charAt(0).toUpperCase() +
                            sortOption.slice(1)}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center space-x-4 mt-4 md:mt-0"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="shadow-sm border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-md transition duration-300 disabled:opacity-50"
              style={{ minWidth: "120px" }}
            >
              Search
            </button>
          </form>

          <Link
            to="/profile/addPost"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-md transition duration-300 disabled:opacity-50 mt-4 md:mt-0"
            style={{ minWidth: "120px" }}
          >
            Create Post
          </Link>
        </div>

        <PostsList
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          searchQuery={searchQuery} // Pass searchQuery to PostsList component
        />
      </div>
      <Footer id={""} />
    </div>
  );
};

export default Homepage;
