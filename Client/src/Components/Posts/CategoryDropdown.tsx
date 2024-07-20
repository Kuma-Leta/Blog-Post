import React, { useState } from "react";

interface CategoryDropdownProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
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

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-bold">Categories:</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-4 py-2 rounded-full w-full text-left flex justify-between items-center shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
        >
          {selectedCategory}
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
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
      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto border border-gray-300 transition duration-300">
          {categories.map((category, index) => (
            <li key={index}>
              <button
                onClick={() => handleCategoryClick(category)}
                className={`block w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white transition duration-300 ${
                  selectedCategory === category
                    ? "bg-gray-300 font-bold text-gray-900"
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
  );
};

export default CategoryDropdown;
