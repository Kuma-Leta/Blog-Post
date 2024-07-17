import React from "react";

import author1 from "../../assets/images/authors/john_doe.png";
import author2 from "../../assets/images/authors/jane_smith.png";
import author3 from "../../assets/images/authors/mickael_brown.png";

interface Author {
  name: string;
  role: string;
  description: string;
  image: string;
}

interface Props {
  id: string;
}

const AuthorsSection: React.FC<Props> = ({ id }) => {
  // Define authors data as an array
  const authors: Author[] = [
    {
      name: "John Doe",
      role: "Senior Developer",
      description:
        "John Doe is an experienced developer with a passion for technology and innovation.",
      image: author1,
    },
    {
      name: "Jane Smith",
      role: "Data Scientist",
      description:
        "Jane Smith specializes in data science and analytics, driving insights from complex datasets.",
      image: author2,
    },
    {
      name: "Michael Brown",
      role: "Cybersecurity Expert",
      description:
        "Michael Brown is a cybersecurity analyst with expertise in identifying and mitigating security threats.",
      image: author3,
    },
    // Add more authors as needed
  ];

  return (
    <section id={id} className="py-16 bg-blue-50 text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Authors</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {authors.map((author, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-200 shadow-md transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl"
            >
              <img
                src={author.image}
                alt={`Author ${index + 1}`}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                style={{ borderRadius: "100%" }}
              />
              <h3 className="text-xl font-bold mb-2">{author.name}</h3>
              <p className="text-gray-600">{author.role}</p>
              <p className="text-lg mt-2 text-gray-700">{author.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorsSection;
