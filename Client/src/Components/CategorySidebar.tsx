import React, { useState } from "react";

interface CategoryDropdownProps {
  categories: string[];
  selectedCategory: string | null;
  handleCategoryClick: (category: string) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  selectedCategory,
  handleCategoryClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-4 py-3 rounded-md flex justify-between items-center shadow-lg w-full md:w-auto"
      >
        <span>{selectedCategory || "Categories"}</span>
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
      {isDropdownOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-md z-10">
          <ul className="max-h-60 overflow-y-auto">
            {categories.map((cat, index) => (
              <li key={index}>
                <button
                  className={`block text-gray-800 hover:bg-gray-200 rounded-md px-3 py-2 transition duration-300 ease-in-out ${
                    selectedCategory === cat ||
                    (cat === "All" && selectedCategory === null)
                      ? "bg-gray-300 font-bold"
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
      )}
    </div>
  );
};

export default CategoryDropdown;
