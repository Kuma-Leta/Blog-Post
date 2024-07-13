import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navbarHeight = 64; // Adjust this value to match your navbar height

  const handleNavigation = (id: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      const section = document.getElementById(id);
      if (section) {
        const offsetTop = section.offsetTop - navbarHeight; // Adjust for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
        setIsOpen(false);
      }
    }
  };

  const textColor = "text-black";
  const bgColor = "bg-white";

  return (
    <nav
      className={`${bgColor} fixed w-full top-0 z-50 transition duration-300`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleNavigation("hero")}
        >
          <img
            src="../../public/DLogo.png"
            alt="Debbal Technologies Logo"
            className="h-10 md:h-12 p-1 rounded-full shadow-md"
            style={{ backgroundColor: "#FFFFFF" }}
          />
          <span
            className="ml-2 text-xl font-bold text-black"
            style={{ fontFamily: "MuseoModerno, sans-serif" }}
          >
            Debbal Tech Gazette
          </span>
        </div>

        <div className="flex md:hidden">
          <button
            type="button"
            className={`text-xl ${textColor} focus:outline-none`}
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
                />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`md:flex items-center ${
            isOpen ? "block" : "hidden"
          } bg-gray-200 md:bg-transparent`}
        >
          <NavLink
            onClick={() => handleNavigation("hero")}
            textColor={textColor}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => handleNavigation("about")}
            textColor={textColor}
          >
            About
          </NavLink>
          <NavLink
            onClick={() => handleNavigation("latest-posts")}
            textColor={textColor}
          >
            Blogs
          </NavLink>
          <NavLink
            onClick={() => handleNavigation("categories")}
            textColor={textColor}
          >
            Categories
          </NavLink>
          <NavLink
            onClick={() => handleNavigation("testimonials")}
            textColor={textColor}
          >
            Testimonials
          </NavLink>
          <NavLink
            onClick={() => handleNavigation("authors")}
            textColor={textColor}
          >
            Authors
          </NavLink>
          <NavLink
            onClick={() => handleNavigation("newsletter")}
            textColor={textColor}
          >
            Newsletter
          </NavLink>
          <NavLink
            onClick={() => handleNavigation("footer")}
            textColor={textColor}
          >
            Contact
          </NavLink>
          <Link
            to="/login"
            className="block px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-full shadow-md transition duration-300 disabled:opacity-50 mb-4 md:hidden"
          >
            Login
          </Link>
        </div>

        <div className="hidden md:flex">
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-md transition duration-300 disabled:opacity-50 "
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{
  onClick: () => void;
  textColor: string;
  children: React.ReactNode;
}> = ({ children, onClick, textColor }) => (
  <a
    className={`block px-4 py-2 text-sm ${textColor} hover:text-gray-900 hover:bg-gray-100 hover:border-2 hover:border-purple-500 rounded-full mx-2 transition duration-300 ease-in-out cursor-pointer`}
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;
