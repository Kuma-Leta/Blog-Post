// import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import FeaturedArticlesSection from "./FeaturedArticlesSection";
import CategoriesSection from "./CategoriesSection";
import TestimonialsSection from "./TestimonialsSection";
import AuthorsSection from "./AuthorsSection";
import NewsletterSection from "./NewsletterSection";
import Footer from "./Footer";
// import LoadingSpinner from "./LoadingSpinner"; // Import LoadingSpinner component

const articles = [
  {
    id: 1,
    title: "Latest in AI",
    description: "Discover the newest advancements in artificial intelligence.",
    imageUrl: "../../public/articles/AI.jpg",
    link: "/article-1",
  },
  {
    id: 2,
    title: "Innovations in Software Development",
    description: "Learn about the latest trends in software development.",
    imageUrl: "../../public/articles/SD.avif",
    link: "/article-2",
  },
  {
    id: 3,
    title: "Cybersecurity Best Practices",
    description: "Protect your data with these cybersecurity tips.",
    imageUrl: "../../public/articles/CS.jpg",
    link: "/article-3",
  },
];

const categories = [
  "AI",
  "Software Development",
  "Cybersecurity",
  "Cloud Computing",
  "Data Science",
  "Machine Learning",
  "Blockchain",
  "Internet of Things (IoT)",
  "DevOps",
  "Quantum Computing",
];

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    title: "CEO, Tech Solutions Inc.",
    quote:
      "Debbal Technologies has been instrumental in helping us stay ahead with their insightful articles and expert analysis.",
    imageUrl: "../../public/testimonials/john_doe.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Data Scientist",
    quote:
      "The articles on Debbal Technologies have been invaluable in my career growth. They cover the latest trends in an accessible manner.",
    imageUrl: "../../public/testimonials/jane_smith.png",
  },
  {
    id: 3,
    name: "Michael Brown",
    title: "Cybersecurity Analyst",
    quote:
      "I rely on Debbal Technologies for up-to-date information on cybersecurity threats and best practices. Highly recommended!",
    imageUrl: "../../public/testimonials/mickael_brown.png",
  },
];

const SystemOverview: React.FC = () => {
  // const [loading, setLoading] = useState(true); // State for loading spinner

  // Simulate a delay to showcase the loading spinner
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false); // Set loading to false after the delay
  //   }, 2000); // Simulating 2 seconds delay

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white relative">
      {/* Loading Spinner */}
      {/* {loading && <LoadingSpinner loading={loading} />} */}

      {/* Content */}
      <div
      // style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease" }}
      >
        <Navbar theme="dark" />

        <HeroSection id="hero" />

        <AboutSection id="about" />

        <FeaturedArticlesSection id="featured-articles" articles={articles} />

        <CategoriesSection id="categories" categories={categories} />

        <TestimonialsSection id="testimonials" testimonials={testimonials} />

        <AuthorsSection id="authors" />

        <NewsletterSection id="newsletter" />

        <Footer id="footer" />
      </div>
    </div>
  );
};

export default SystemOverview;
