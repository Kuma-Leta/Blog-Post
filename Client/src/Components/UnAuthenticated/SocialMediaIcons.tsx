import React from "react";
import {
  IoLogoGoogle,
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoTwitter,
  IoLogoLinkedin,
} from "react-icons/io";
import { FaApple } from "react-icons/fa";

const SocialMediaIcons: React.FC = () => {
  return (
    <div className="mt-4 flex justify-center space-x-3">
      <button className="hover:bg-red-500 hover:text-white p-2 rounded-full transition duration-300">
        <IoLogoGoogle size={24} />
      </button>
      <button className="hover:bg-blue-600 hover:text-white p-2 rounded-full transition duration-300">
        <IoLogoFacebook size={24} />
      </button>
      <button className="hover:bg-black hover:text-white p-2 rounded-full transition duration-300">
        <IoLogoGithub size={24} />
      </button>
      <button className="hover:bg-gray-800 hover:text-white p-2 rounded-full transition duration-300">
        <FaApple size={24} />
      </button>
      <button className="hover:bg-blue-400 hover:text-white p-2 rounded-full transition duration-300">
        <IoLogoTwitter size={24} />
      </button>
      <button className="hover:bg-blue-600 hover:text-white p-2 rounded-full transition duration-300">
        <IoLogoLinkedin size={24} />
      </button>
    </div>
  );
};

export default SocialMediaIcons;
