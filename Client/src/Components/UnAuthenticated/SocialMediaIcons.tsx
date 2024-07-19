import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const SocialMediaIcons: React.FC = () => {
  return (
    <div className="flex justify-center space-x-6">
      <a
        href="https://www.facebook.com/DebbalTechnologies"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-500"
        aria-label="Facebook"
      >
        <FaFacebookF size={24} />
      </a>
      <a
        href="https://twitter.com/DebbalTech"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-400"
        aria-label="Twitter"
      >
        <FaTwitter size={24} />
      </a>
      <a
        href="https://www.linkedin.com/company/debbal-technologies"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-700"
        aria-label="LinkedIn"
      >
        <FaLinkedinIn size={24} />
      </a>
      <a
        href="https://www.instagram.com/debbaltechnologies"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-pink-500"
        aria-label="Instagram"
      >
        <FaInstagram size={24} />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
