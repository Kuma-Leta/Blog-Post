import React from "react";
import { FiArrowRightCircle } from "react-icons/fi";
// import backgroundImage from "../../assets/images/vecteezy_touching-technology-and-icon-customer-global-network-connection_3503591.jpg"; // Adjust the path to your image
import backgroundImage from "../../assets/images/vecteezy_businessmen-use-smartphones-to-conduct-online-transactions_6694131.jpg"; // Adjust the path to your image
// import backgroundImage from "../../assets/images/nick-morrison-FHnnjk1Yj7Y-unsplash.jpg"; // Adjust the path to your image

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
      className="relative flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
        height: "calc(100vh - 10px)", // Adjust the navbar height here
      }}
    >
      {/* Background Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-purple-900 rounded-lg opacity-75"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white">
        {/* Logo */}
        <img
          src="/DLogo.png" // Adjust the path as per your project structure
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
            className="bg-white text-purple-500 hover:text-purple-600 font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
          >
            Explore Latest Posts{" "}
            <FiArrowRightCircle className="inline-block ml-1" />
          </button>
          <button
            onClick={() => handleNavigation("newsletter")}
            className="bg-white text-purple-500 hover:text-purple-600 font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
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
