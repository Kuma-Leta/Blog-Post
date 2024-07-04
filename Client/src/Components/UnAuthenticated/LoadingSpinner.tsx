// LoadingSpinner.tsx
import React from "react";
import { FaSpinner } from "react-icons/fa";

interface LoadingSpinnerProps {
  loading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <FaSpinner className="animate-spin text-blue-500 text-5xl mb-4" />
        <p className="text-xl text-blue-500">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
