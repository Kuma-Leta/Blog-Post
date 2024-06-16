/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Navbar from "./AuthenticatedNavbar";
import PostsList from "./Posts/PostsList";
import CategorySidebar from "./CategorySidebar";
import SearchBar from "./SearchBar";
import CreatePostButton from "./CreatePostButton";
import WelcomeSection from "./WelcomeSection";
import Footer from "./Footer";

const Homepage: React.FC = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(true); // Replace with actual authentication state
  // const [username, setUsername] = useState("John Doe"); // Replace with actual username if authenticated
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // State to store selected category

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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === "All" ? null : category); // Update selected category state
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto py-8 px-4 md:px-0">
        <WelcomeSection />

        <div className="flex flex-col md:flex-row">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />

          <main className="w-full md:w-4/5">
            <SearchBar />
            <CreatePostButton />
            <PostsList selectedCategory={selectedCategory} />
          </main>
        </div>
      </div>

      <Footer id={""} />
    </div>
  );
};

export default Homepage;
