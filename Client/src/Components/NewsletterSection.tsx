import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

interface Props {
  id: string;
}

const NewsletterSection: React.FC<Props> = ({ id }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <section id={id} className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-lg mb-8">
          Stay up-to-date with our latest articles and industry insights.
        </p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-8">
          <div className="flex items-center border-b border-b-2 border-white py-2">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-transparent text-white placeholder-white focus:outline-none w-full"
            />
            <button
              type="submit"
              className="text-white ml-4 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              Subscribe
            </button>
          </div>
        </form>
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
      </div>
    </section>
  );
};

export default NewsletterSection;
