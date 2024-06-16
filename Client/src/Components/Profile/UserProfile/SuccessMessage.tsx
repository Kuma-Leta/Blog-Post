import React from "react";

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  onClose,
}) => (
  <div
    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
    role="alert"
  >
    <strong className="font-bold">Success!</strong>
    <span className="block sm:inline">{message}</span>
    <button
      onClick={onClose}
      className="absolute top-0 bottom-0 right-0 px-4 py-3"
    >
      <span className="text-xl">&times;</span>
    </button>
  </div>
);

export default SuccessMessage;
