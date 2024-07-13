import React from "react";
import { Link } from "react-router-dom";

const WelcomeSection: React.FC = () => {
  const scrollToPosts = () => {
    const postListSection = document.getElementById("latest-posts");
    if (postListSection) {
      postListSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-0 relative z-10">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold animate-fadeInDown">
            Welcome to Debbal Tech Gazette
          </h1>
          <p className="text-lg md:text-xl mt-4 animate-fadeInUp">
            Explore and enjoy our latest posts
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/profile/addPost"
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
            >
              Create Post
            </Link>
          </div>
          <div className="mt-8">
            <button
              onClick={scrollToPosts}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg border border-gray-300  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
            >
              Discover More
            </button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-20 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0 w-full max-w-lg h-96 bg-noise opacity-30"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple-500 rounded-full blur-xl opacity-20 animate-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-pink-500 rounded-full blur-lg opacity-20 animate-spin-slow"></div>
      <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-red-500 rounded-full blur-lg opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-blue-500 rounded-full blur-md opacity-20 animate-bounce"></div>
      <div className="absolute top-1/4 left-1/2 w-28 h-28 bg-green-500 rounded-full blur-lg opacity-20 animate-spin"></div>
    </div>
  );
};

export default WelcomeSection;
