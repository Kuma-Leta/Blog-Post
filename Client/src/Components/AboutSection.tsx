import React from "react";

interface Props {
  id: string;
}

const AboutSection: React.FC<Props> = ({ id }) => {
  return (
    <section id={id} className="py-16 bg-white text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">About Debbal Technologies</h2>
        <p className="text-lg leading-relaxed mb-8">
          At Debbal Technologies, we are committed to providing the latest in
          tech news, tutorials, and industry insights. Our mission is to empower
          individuals and organizations with the knowledge and tools they need
          to succeed in the tech world.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
