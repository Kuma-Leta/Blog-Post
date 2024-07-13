import React from "react";
import Navbar from "./AuthenticatedNavbar";
import WelcomeSection from "./WelcomeSection";
import PostsList from "./Posts/PostsList";
import Footer from "./Footer";

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
