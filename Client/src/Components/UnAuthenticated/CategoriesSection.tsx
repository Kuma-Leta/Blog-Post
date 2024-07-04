import React from "react";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  categories: string[];
}

const CategoriesSection: React.FC<Props> = ({ id, categories }) => {
  return (
    <section id={id} className="py-16 bg-white text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Blog Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-lg bg-gray-100 transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1 hover:bg-gray-200"
            >
              <h3 className="text-xl font-bold mb-2">{category}</h3>
              <p className="text-gray-700 mb-4">
                Explore articles on {category.toLowerCase()}.
              </p>
              <Link
                to={`/category-${category.toLowerCase()}`}
                className="text-blue-500 hover:underline"
              >
                Explore {category}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
