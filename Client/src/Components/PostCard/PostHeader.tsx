import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface PostHeaderProps {
  ratingQuantity: number;
  averageRating: number;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  ratingQuantity,
  averageRating,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 p-4">
      <div className="flex items-center text-sm text-gray-600">
        <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-500" />
        <span className="mr-2">{ratingQuantity} ratings</span>
        <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-500" />
        <span>Average rating: {averageRating.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default PostHeader;
