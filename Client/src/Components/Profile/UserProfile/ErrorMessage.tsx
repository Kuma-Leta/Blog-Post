import React from "react";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="  relative left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white font-bold focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
