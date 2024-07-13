import React from "react";

import author1 from "../../assets/images/authors/john_doe.png";
import author2 from "../../assets/images/authors/jane_smith.png";
import author3 from "../../assets/images/authors/mickael_brown.png";

interface Props {
  id: string;
}

const AuthorsSection: React.FC<Props> = ({ id }) => {
  return (
    <section id={id} className="py-16 bg-gray-100 text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Authors</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Author Card 1 */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <img
              src={author1}
              alt="Author 1"
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-bold mb-2">John Doe</h3>
            <p className="text-gray-600">Senior Developer</p>
            <p className="text-lg mt-2 text-gray-700">
              John Doe is an experienced developer with a passion for technology
              and innovation.
            </p>
          </div>

          {/* Author Card 2 */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <img
              src={author2}
              alt="Author 2"
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-bold mb-2">Jane Smith</h3>
            <p className="text-gray-600">Data Scientist</p>
            <p className="text-lg mt-2 text-gray-700">
              Jane Smith specializes in data science and analytics, driving
              insights from complex datasets.
            </p>
          </div>

          {/* Author Card 3 */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <img
              src={author3}
              alt="Author 3"
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              style={{
                borderRadius: "100%",
                width: "150px",
                height: "150px",
              }}
            />
            <h3 className="text-xl font-bold mb-2">Michael Brown</h3>
            <p className="text-gray-600">Cybersecurity Expert</p>
            <p className="text-lg mt-2 text-gray-700">
              Michael Brown is a cybersecurity analyst with expertise in
              identifying and mitigating security threats.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorsSection;
