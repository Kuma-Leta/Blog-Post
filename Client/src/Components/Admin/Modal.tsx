import React from "react";

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="purple"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
