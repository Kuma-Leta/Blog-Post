import React, { useState } from "react";

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string | null;
  handleCategoryClick: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  handleCategoryClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside className="w-full md:w-1/5 mb-8 md:mb-0 md:mr-6">
      {/* Dropdown button for small screens */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleDropdown}
          className="bg-gray-800 text-white px-4 py-2 rounded-md w-full text-left flex justify-between items-center"
        >
          <span>Categories</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
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

      {/* Sidebar for medium and larger screens */}
      <div
        className={`bg-white rounded-lg shadow-md p-3 md:sticky md:top-20 max-h-[calc(100vh-5rem)] overflow-y-auto ${
          isDropdownOpen ? "block" : "hidden md:block"
        }`}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Categories</h2>
        <ul className="space-y-1">
          {categories.map((cat, index) => (
            <li key={index}>
              <button
                className={`block text-gray-700 hover:bg-gray-200 rounded-md px-2 py-1 transition duration-300 ease-in-out transform hover:scale-105 ${
                  selectedCategory === cat ||
                  (cat === "All" && selectedCategory === null)
                    ? "bg-gray-200"
                    : ""
                }`}
                onClick={() => {
                  handleCategoryClick(cat);
                  setIsDropdownOpen(false); // Close the dropdown on selection
                }}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default CategorySidebar;
