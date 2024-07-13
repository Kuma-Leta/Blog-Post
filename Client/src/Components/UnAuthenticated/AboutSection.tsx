import React from "react";
import { FiEye, FiTarget, FiTrendingUp, FiCheckCircle } from "react-icons/fi"; // Import icons from react-icons library

interface Props {
  id: string;
}

const AboutSection: React.FC<Props> = ({ id }) => {
  return (
    <section
      id={id}
      className="bg-white text-gray-800 py-16 px-4 md:px-16 lg:px-32"
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        About Debbal Tech Gazette
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/3 p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg text-white">
          <div className="flex items-center mb-4">
            <FiEye className="text-2xl mr-2" />
            <h3 className="text-xl font-semibold">Our Vision</h3>
          </div>
          <ul className="list-disc pl-6">
            <li className="text-base flex items-center">
              <FiCheckCircle className="text-gray-200 mr-2" />
              Become the ultimate destination for tech insights.
            </li>
            <li className="text-base flex items-center">
              <FiCheckCircle className="text-gray-200 mr-2" />
              Provide comprehensive tutorials for all skill levels.
            </li>
            <li className="text-base flex items-center">
              <FiCheckCircle className="text-gray-200 mr-2" />
              Stay ahead with the latest in technological advancements.
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg text-white">
          <div className="flex items-center mb-4">
            <FiTarget className="text-2xl mr-2" />
            <h3 className="text-xl font-semibold">Our Mission</h3>
          </div>
          <ul className="list-disc pl-6">
            <li className="text-base flex items-center">
              <FiCheckCircle className="text-gray-200 mr-2" />
              Empower tech enthusiasts, professionals, and learners.
            </li>
            <li className="text-base flex items-center">
              <FiCheckCircle className="text-gray-200 mr-2" />
              Provide valuable insights through our curated content.
            </li>
            <li className="text-base flex items-center">
              <FiCheckCircle className="text-gray-200 mr-2" />
              Promote continuous learning and skill development.
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg text-white">
          <div className="flex items-center mb-4">
            <FiTrendingUp className="text-2xl mr-2" />
            <h3 className="text-xl font-semibold">Stay Updated</h3>
          </div>
          <ul className="list-disc pl-6">
            <li className="text-base flex items-center">
              <FiCheckCircle className="text-gray-200 mr-2" />
              Keep our readers informed with the latest industry trends.
            </li>
            <li className="text-base flex items-center">
              <FiCheckCircle className="text-gray-200 mr-2" />
              Offer insights on emerging technologies and their impact.
            </li>
            <li className="text-base flex items-center">
              <FiCheckCircle className="text-gray-200 mr-2" />
              Provide practical advice to navigate the tech landscape.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
