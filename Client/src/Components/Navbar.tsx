import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  theme: "light" | "dark";
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const baseTextColor = theme === "light" ? "text-black" : "text-white";
  const baseBgColor =
    theme === "light" ? "bg-white" : "bg-transparent bg-opacity-70";
  const scrolledTextColor = "text-black";
  const scrolledBgColor = "bg-white bg-opacity-80 shadow-md";

  const textColor = scrolled ? scrolledTextColor : baseTextColor;
  const bgColor = scrolled ? scrolledBgColor : baseBgColor;
  const hamburgerColor = scrolled ? "text-black" : baseTextColor;
  const openTextColor = isOpen && !scrolled ? "text-black" : textColor;

  return (
    <nav
      className={`${bgColor} fixed w-full top-0 z-50 transition duration-300`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className={`text-xl font-bold ${textColor} flex items-center`}
          onClick={() => {
            scrollToSection("hero");
          }}
        >
          {/* Debbal Technologies */}
          <img
            src="../../public/DLogo.png"
            alt="Debbal Technologies Logo"
            className="h-8 md:h-10 p-1 rounded-full shadow-md"
            style={{ backgroundColor: "#FFFFFF" }}
          />
        </Link>

        <div className="flex md:hidden">
          <button
            type="button"
            className={`text-xl ${hamburgerColor} focus:outline-none`}
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
            onClick={() => scrollToSection("hero")}
            textColor={openTextColor}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => scrollToSection("about")}
            textColor={openTextColor}
          >
            About
          </NavLink>
          <NavLink
            onClick={() => scrollToSection("featured-articles")}
            textColor={openTextColor}
          >
            Featured Articles
          </NavLink>
          <NavLink
            onClick={() => scrollToSection("categories")}
            textColor={openTextColor}
          >
            Categories
          </NavLink>
          <NavLink
            onClick={() => scrollToSection("testimonials")}
            textColor={openTextColor}
          >
            Testimonials
          </NavLink>
          <NavLink
            onClick={() => scrollToSection("authors")}
            textColor={openTextColor}
          >
            Authors
          </NavLink>
          <NavLink
            onClick={() => scrollToSection("newsletter")}
            textColor={openTextColor}
          >
            Newsletter
          </NavLink>
          <NavLink
            onClick={() => scrollToSection("footer")}
            textColor={openTextColor}
          >
            Contact
          </NavLink>
          <Link
            to="/login"
            className="block px-4 py-2 bg-blue-700 rounded-full hover:bg-blue-800 mx-2 text-white md:hidden"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block px-4 py-2 bg-green-500 rounded-full hover:bg-green-600 mx-2 text-white md:hidden"
          >
            Sign Up
          </Link>
        </div>

        <div className="hidden md:flex">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-700 rounded-full hover:bg-blue-800 mx-2 text-white"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-green-500 rounded-full hover:bg-green-600 mx-2 text-white"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ onClick: () => void; textColor: string }> = ({
  children,
  onClick,
  textColor,
}) => (
  <Link
    to="/"
    className={`block px-3 py-2 text-sm ${textColor} hover:text-gray-900 hover:bg-gray-100 rounded-md mx-2 transition duration-300 ease-in-out`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
