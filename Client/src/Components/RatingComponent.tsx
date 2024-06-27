import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useUser } from "../UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Rating {
  _id: string;
  user: {
    id: string;
    name: string;
  };
  post: {
    _id: string;
  };
  rating: number;
  createdAt: string;
  __v: number;
}

interface RatingComponentProps {
  postId: string;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ postId }) => {
  const { user: currentUser } = useUser();

  const [rating, setRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<Rating | null>(null);
  const [canRate, setCanRate] = useState<boolean>(true);
  const [averageRating, setAverageRating] = useState<number>(0); // State for average rating

  useEffect(() => {
    fetchUserRating();
    fetchAverageRating();
  }, []);

  const fetchUserRating = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.get<Rating[]>(
        `http://localhost:5000/api/v1/rating`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const userRatingData: Rating | undefined = response.data.data.data.find(
        (rate: Rating) => rate.user.id === currentUser.id
      );

      if (userRatingData) {
        setUserRating(userRatingData);
        setRating(userRatingData.rating);
        setCanRate(true);
      } else {
        setUserRating(null);
        setRating(0);
        setCanRate(true);
      }
    } catch (error) {
      console.error("Error fetching user rating:", error);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get<number>(
        `http://localhost:5000/api/v1/rating/average/${postId}`
      );
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };

  const handleRatingChange = async (newRating: number) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      if (userRating) {
        await axios.patch(
          `http://localhost:5000/api/v1/rating/${userRating._id}`,
          {
            rating: newRating,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setUserRating((prev) => (prev ? { ...prev, rating: newRating } : null));
        setRating(newRating);
      } else {
        const response = await axios.post(
          `http://localhost:5000/api/v1/rating`,
          {
            post: postId,
            user: currentUser.id,
            rating: newRating,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setUserRating(response.data.data);
        setRating(newRating);
      }
      // Show styled pop-up message for adding/updating rating
      toast.success(`Rating ${userRating ? "updated" : "added"} successfully!`);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const handleDeleteRating = async () => {
    try {
      if (userRating) {
        await axios.delete(
          `http://localhost:5000/api/v1/rating/${userRating._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setUserRating(null);
        setRating(0);
        // Show styled pop-up message for deleting rating
        toast.success("Rating deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <FontAwesomeIcon
          key={value}
          icon={faStar}
          className={`cursor-pointer text-yellow-500 ${
            value <= (averageRating || 0) ? "text-yellow-500" : "text-gray-400"
          }`}
          onClick={() => (canRate ? handleRatingChange(value) : null)}
        />
      ))}
      {userRating && (
        <button
          className="ml-2 text-red-500"
          onClick={() => (canRate ? handleDeleteRating() : null)}
        >
          Delete Rating
        </button>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default RatingComponent;
