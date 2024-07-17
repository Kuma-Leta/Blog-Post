import React from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

interface Props {
  id: string;
  categories: string[];
}

const CategoriesSection: React.FC<Props> = ({ id, categories }) => {
  return (
    <section id={id} className="flex items-center py-16 bg-blue-100 text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Blog Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category}`}
              className="bg-white category-container block p-6 rounded-lg shadow-lg bg-cover bg-center bg-no-repeat transition duration-300 ease-linear transform hover:shadow-xl hover:-translate-y-1 hover:rotate-2 hover:bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-110 relative overflow-hidden"
            >
              <h3 className="category-title text-2xl font-bold mb-4 transition duration-300 ease-in-out">
                {category}
              </h3>
              <p className="category-description text-gray-700 mb-6 transition duration-300 ease-in-out">
                Discover the latest articles and insights on{" "}
                {category.toLowerCase()}.
              </p>
              <div className="category-link text-purple-700 font-medium inline-flex items-center transition duration-300 ease-in-out">
                Explore {category} <FaAngleRight className="ml-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
