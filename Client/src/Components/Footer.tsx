import React from "react";

interface Props {
  id: string;
}

const Footer: React.FC<Props> = ({ id }) => {
  return (
    <footer id={id} className="py-2 bg-gray-900 text-white text-center">
      <div className="container mx-auto px-4">
        <p>&copy; 2024 Debbal Technologies. All rights reserved.</p>
        <div className="">
          <a href="#" className="hover:underline mx-2">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline mx-2">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
