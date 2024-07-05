// LoadingSpinner.tsx
import React from "react";
import { FaSpinner } from "react-icons/fa";

interface LoadingSpinnerProps {
  loading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50 rounded-lg">
      <div className="flex flex-col items-center">
        <FaSpinner className="animate-spin text-purple-500 text-5xl mb-4" />
        <p className="text-xl text-purple-500">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
