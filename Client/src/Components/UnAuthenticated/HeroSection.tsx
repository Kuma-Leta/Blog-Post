import React from "react";

interface Props {
  id: string;
}

const HeroSection: React.FC<Props> = ({ id }) => {
  return (
    <header
      id={id}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <img
        src="../../public/DLogo.png"
        alt="Debbal Technologies"
        className="w-32 mb-4"
      />
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Debbal Technologies
      </h1>
      <p className="text-lg mb-8">
        Innovating the future with technology insights and tutorials.
      </p>
    </header>
  );
};

export default HeroSection;
