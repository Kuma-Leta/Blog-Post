// import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import LatestPosts from "./LatestPosts";
import CategoriesSection from "./CategoriesSection";
import TestimonialsSection from "./TestimonialsSection";
import AuthorsSection from "./AuthorsSection";
import NewsletterSection from "./NewsletterSection";
import Footer from "./Footer";
// import LoadingSpinner from "./LoadingSpinner"; // Import LoadingSpinner component

// import testimony1 from "../../assets/images/testimonials/john_doe.png";
// import testimony2 from "../../assets/images/testimonials/jane_smith.png";
// import testimony3 from "../../assets/images/testimonials/mickael_brown.png";

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

// const testimonials = [
//   {
//     id: 1,
//     name: "John Doe",
//     title: "CEO, Tech Solutions Inc.",
//     quote:
//       "Debbal Technologies has been instrumental in helping us stay ahead with their insightful articles and expert analysis.",
//     imageUrl: { testimony1 },
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     title: "Data Scientist",
//     quote:
//       "The articles on Debbal Technologies have been invaluable in my career growth. They cover the latest trends in an accessible manner.",
//     imageUrl: { testimony2 },
//   },
//   {
//     id: 3,
//     name: "Michael Brown",
//     title: "Cybersecurity Analyst",
//     quote:
//       "I rely on Debbal Technologies for up-to-date information on cybersecurity threats and best practices. Highly recommended!",
//     imageUrl: { testimony3 },
//   },
// ];

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
        <Navbar />

        <HeroSection id="hero" />

        <AboutSection id="about" />

        <LatestPosts />

        <CategoriesSection id="categories" categories={categories} />

        <TestimonialsSection id="testimonials" />
        {/* testimonials={testimonials} */}

        <AuthorsSection id="authors" />

        <NewsletterSection id="newsletter" />

        <Footer id="footer" />
      </div>
    </div>
  );
};

export default SystemOverview;
