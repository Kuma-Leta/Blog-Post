import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface RatingStarsProps {
  currentRating: number; // Rating given by current user
  onRate: (rating: number) => void; // Callback function when user rates
}

const RatingStars: React.FC<RatingStarsProps> = ({ currentRating, onRate }) => {
  const totalStars = 5; // Total number of stars

  const handleStarClick = (rating: number) => {
    onRate(rating);
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className="cursor-pointer"
            onClick={() => handleStarClick(starValue)}
          >
            {starValue <= currentRating ? (
              <FaStar className="text-yellow-500" />
            ) : (
              <FaRegStar className="text-gray-400" />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default RatingStars;
