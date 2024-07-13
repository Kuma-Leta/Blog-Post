import React from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

interface Props {
  id: string;
  categories: string[];
}

const CategoriesSection: React.FC<Props> = ({ id, categories }) => {
  return (
    <section
      id={id}
      className="py-16 bg-gradient-to-b from-gray-100 to-white text-black"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Blog Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-lg bg-white transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1 hover:bg-gray-50"
            >
              <h3 className="text-2xl font-bold mb-4">{category}</h3>
              <p className="text-gray-700 mb-6">
                Discover the latest articles and insights on{" "}
                {category.toLowerCase()}.
              </p>
              <Link
                to={`/category/${category}`}
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                Explore {category} <FaAngleRight className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
