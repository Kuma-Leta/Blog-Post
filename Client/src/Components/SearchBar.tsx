import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto mb-6">
      <input
        type="text"
        placeholder="Search posts..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default SearchBar;
