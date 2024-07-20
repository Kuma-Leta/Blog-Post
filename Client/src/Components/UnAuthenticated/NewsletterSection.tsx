import React from "react";
import SocialMediaIcons from "./SocialMediaIcons"; // Adjust the path as necessary

interface Props {
  id: string;
}

const NewsletterSection: React.FC<Props> = ({ id }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section id={id} className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-lg mb-8">
          Stay up-to-date with our latest articles and industry insights.
        </p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-8">
          <div className="flex items-center border-b-2 border-white py-2">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-transparent text-white placeholder-white focus:outline-none w-full"
            />
            <button
              type="submit"
              className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white focus:outline-none"
            >
              Subscribe
            </button>
          </div>
        </form>
        <SocialMediaIcons />
      </div>
    </section>
  );
};

export default NewsletterSection;
