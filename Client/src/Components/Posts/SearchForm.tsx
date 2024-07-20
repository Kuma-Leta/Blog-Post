import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchFormProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <form
      onSubmit={onSearchSubmit}
      className="relative flex items-center w-full md:w-auto"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by title, category, or keyword"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </form>
  );
};

export default SearchForm;
