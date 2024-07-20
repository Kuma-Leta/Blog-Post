import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import LatestPosts from "./LatestPosts";
import CategoriesSection from "./CategoriesSection";
import TestimonialsSection from "./TestimonialsSection";
import AuthorsSection from "./AuthorsSection";
import NewsletterSection from "./NewsletterSection";
import Footer from "./Footer";

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

const SystemOverview: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white relative">
      <div>
        <Navbar />

        <HeroSection id="hero" />

        <AboutSection id="about" />

        <LatestPosts />

        <CategoriesSection id="categories" categories={categories} />

        <TestimonialsSection id="testimonials" />

        <AuthorsSection id="authors" />

        <NewsletterSection id="newsletter" />

        <Footer id="footer" />
      </div>
    </div>
  );
};

export default SystemOverview;
