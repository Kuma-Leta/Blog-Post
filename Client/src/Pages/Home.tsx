import React from "react";
import Navbar from "../Components/AuthenticatedNavbar";
import WelcomeSection from "../Components/WelcomeSection";
import PostsList from "../Components/Posts/PostsList";
import Footer from "../Components/Footer";

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Navbar />
      <WelcomeSection />
      <PostsList />
      <Footer id={""} />
    </div>
  );
};

export default Homepage;
