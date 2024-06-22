import React, { useState } from "react";
import Navbar from "./AuthenticatedNavbar";
import PostsList from "./Posts/PostsList";
import CategorySidebar from "./CategorySidebar";
import SearchBar from "./SearchBar";
import CreatePostButton from "./CreatePostButton";
import WelcomeSection from "./WelcomeSection";
import Footer from "./Footer";

const Homepage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    setSelectedCategory(category === "All" ? null : category);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto py-8 px-4 md:px-0">
        <WelcomeSection />

        <div className="flex flex-col md:flex-row mt-8">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
            className="mb-4 md:mb-0 md:mr-4 w-full md:w-1/4"
          />

          <main className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <SearchBar />
              <CreatePostButton />
            </div>
            <div className="mt-8">
              <PostsList selectedCategory={selectedCategory} />
            </div>
          </main>
        </div>
      </div>

      <Footer id={""} />
    </div>
  );
};

export default Homepage;
