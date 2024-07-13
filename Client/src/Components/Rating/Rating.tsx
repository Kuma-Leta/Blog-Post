import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import axios from "axios";

interface RatingProps {
  postId: string;
  averageRating: number;
  ratingQuantity: number;
  isAuthor: boolean;
}

const Rating: React.FC<RatingProps> = ({
  postId,
  averageRating,
  ratingQuantity,
  isAuthor,
}) => {
  const handleRatingClick = async (rating: number) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `http://localhost:5000/api/v1/post/ratePost/${postId}`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Ideally, you would update the post's rating in the parent component state or via API call
      // Example: fetchPost() or update local state to reflect the new rating
    } catch (error) {
      console.error("Error rating post:", error);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <BsStarFill key={i} className="text-yellow-400 cursor-pointer" />
          ))}
        {halfStars === 1 && (
          <BsStarHalf className="text-yellow-400 cursor-pointer" />
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <BsStar key={i} className="text-yellow-400 cursor-pointer" />
          ))}
      </>
    );
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {renderStars(averageRating)}
        <span className="text-gray-600 ml-2">
          ({ratingQuantity} {ratingQuantity === 1 ? "rating" : "ratings"})
        </span>
      </div>
      {!isAuthor && (
        <div className="flex ml-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <BsStarFill
              key={index}
              className="text-gray-400 cursor-pointer"
              onClick={() => handleRatingClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Rating;
