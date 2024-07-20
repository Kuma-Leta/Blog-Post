import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
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

  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-4 py-2 rounded-full shadow-md transition duration-300 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>
      <div className="flex space-x-2">{renderPageNumbers()}</div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-4 py-2 rounded-full shadow-md transition duration-300 disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
