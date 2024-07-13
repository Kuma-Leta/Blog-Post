import React, { useState } from "react";

interface SortDropdownProps {
  selectedSort: string;
  onSortSelect: (sort: string) => void;
}

const sortOptions = [
  { label: "Date", value: "date" },
  { label: "Rating", value: "rating" },
  { label: "Category", value: "category" },
  { label: "Title", value: "title" },
];

const SortDropdown: React.FC<SortDropdownProps> = ({
  selectedSort,
  onSortSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSortChange = (sortOption: string) => {
    onSortSelect(sortOption);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-bold">Sort by:</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-4 py-2 rounded-full w-full text-left flex justify-between items-center shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
        >
          {sortOptions.find((option) => option.value === selectedSort)?.label}
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
          {sortOptions.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => handleSortChange(option.value)}
                className={`block w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white transition duration-300 ${
                  selectedSort === option.value
                    ? "bg-gray-300 font-bold text-gray-900"
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
  );
};

export default SortDropdown;
