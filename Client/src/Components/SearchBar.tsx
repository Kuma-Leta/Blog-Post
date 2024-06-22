import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto mb-6 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search posts..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default SearchBar;
