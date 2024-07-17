import React from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import logo from "../../assets/DLogo.png"; // Adjust the path to your image
import videoBackground from "../../../public/Top-Five-AI-Trends-to-Look-Out-for-in-2023.mp4";

interface Props {
  id: string;
}

const HeroSection: React.FC<Props> = ({ id }) => {
  const navbarHeight = 64; // Adjust this value to match your navbar height

  const handleNavigation = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offsetTop = section.offsetTop - navbarHeight; // Adjust for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      id={id}
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        height: "100vh", // Full viewport height
        overflow: "hidden", // Ensure video stays within viewport
        position: "relative", // Ensure proper positioning context
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{
          objectFit: "cover",
        }}
      >
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Background Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-75 z-10"></div>

      {/* Content Wrapper */}
      <div className="relative z-20 flex flex-col items-center justify-center text-white">
        {/* Logo */}
        <img
          src={logo} // Adjust the path as per your project structure
          alt="Debbal Technologies"
          className="w-32 mb-4"
        />

        {/* Main Heading */}
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Debbal Tech Gazette
        </h1>

        {/* Subheading / Mission Statement */}
        <p className="text-lg mb-6">
          Your Source for Technology Insights and Tutorials
        </p>

        {/* Call to Action */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleNavigation("latest-posts")}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 transform hover:scale-105"
          >
            Explore Latest Posts{" "}
            <FiArrowRightCircle className="inline-block ml-1" />
          </button>
          <button
            onClick={() => handleNavigation("newsletter")}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 transform hover:scale-105"
          >
            Sign Up for Newsletter{" "}
            <FiArrowRightCircle className="inline-block ml-1" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
