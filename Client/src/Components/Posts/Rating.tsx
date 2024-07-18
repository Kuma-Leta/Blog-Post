/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import axios from "axios";

interface RatingProps {
  postId: string | undefined;
  user: any;
}

const Rating: React.FC<RatingProps> = ({ postId, user }) => {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingQuantity, setRatingQuantity] = useState<number>(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [ratingId, setRatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Fetch average rating and rating quantity
        const response = await axios.get(
          `http://localhost:5000/api/v1/post/getPost/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const post = response.data.data.post;
        setAverageRating(post.averageRating);
        setRatingQuantity(post.ratingQuantity);

        // Check if the current user is the author of the post
        setIsAuthor(post.user._id === user._id);

        // Fetch all ratings for the current post
        const ratingsResponse = await axios.get(
          `http://localhost:5000/api/v1/rating/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        const allRatings = ratingsResponse.data.data.data;

        // Find user's rating for the current post
        const userRating = allRatings.find((rating: any) => {
          return rating.post._id === postId && rating.user._id === user._id;
        });

        if (userRating) {
          setUserRating(userRating.rating);
          setRatingId(userRating._id); // Store the rating ID
        } else {
          setUserRating(null);
          setRatingId(null);
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    // Reset the state before fetching new data
    setUserRating(null);
    setAverageRating(0);
    setRatingQuantity(0);
    setIsAuthor(false);
    setRatingId(null);

    fetchRating();
  }, [postId, user._id]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <BsStarFill key={i} className="text-yellow-400" />
          ))}
        {halfStars === 1 && <BsStarHalf className="text-yellow-400" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <BsStar key={i} className="text-yellow-400" />
          ))}
      </>
    );
  };

  const renderStarsWithClick = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <BsStarFill
              key={i}
              className="text-yellow-400 cursor-pointer"
              onClick={() => setSelectedRating(i + 1)}
            />
          ))}
        {halfStars === 1 && (
          <BsStarHalf
            className="text-yellow-400 cursor-pointer"
            onClick={() => setSelectedRating(fullStars + 0.5)}
          />
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <BsStar
              key={i + fullStars + halfStars}
              className="text-yellow-400 cursor-pointer"
              onClick={() => setSelectedRating(fullStars + halfStars + i + 1)}
            />
          ))}
      </>
    );
  };

  const openRatingModal = () => {
    setShowRatingModal(true);
    setSelectedRating(userRating || 0);
  };

  const closeRatingModal = () => {
    setShowRatingModal(false);
  };

  const submitRating = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const ratingData = {
        post: postId,
        rating: selectedRating,
      };

      let response;

      if (userRating === null) {
        // Add new rating
        response = await axios.post(
          `http://localhost:5000/api/v1/rating`,
          ratingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set the ratingId to the new rating's ID
        setRatingId(response.data.data.data._id);
      } else {
        // Update existing rating
        response = await axios.patch(
          `http://localhost:5000/api/v1/rating/${ratingId}`,
          ratingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Update the state after submitting the rating
      setUserRating(selectedRating);
      setShowRatingModal(false);

      // Refetch the average rating and quantity after submitting the rating
      const postResponse = await axios.get(
        `http://localhost:5000/api/v1/post/getPost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const post = postResponse.data.data.post;
      setAverageRating(post.averageRating);
      setRatingQuantity(post.ratingQuantity);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const confirmDeleteRating = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `http://localhost:5000/api/v1/rating/${ratingId}`, // Use ratingId instead of postId
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear user's rating after deletion
      setUserRating(null);
      setShowDeleteModal(false);

      // Refetch the average rating and quantity after deleting the rating
      const response = await axios.get(
        `http://localhost:5000/api/v1/post/getPost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const post = response.data.data.post;
      setAverageRating(post.averageRating);
      setRatingQuantity(post.ratingQuantity);
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <p className="text-gray-600 mr-2">Average Rating:</p>
        <div className="flex items-center">
          {renderStars(averageRating)}
          <span className="text-gray-600 ml-2">({ratingQuantity} ratings)</span>
        </div>
      </div>

      {!isAuthor && (
        <div className="mt-4">
          <p className="text-gray-600">Your Rating:</p>
          <div className="flex items-center">
            {userRating !== null ? (
              renderStars(userRating)
            ) : (
              <span className="text-gray-600">
                You haven't rated this post yet.
              </span>
            )}
          </div>
          <div className="mt-2 space-x-4">
            <button
              onClick={openRatingModal}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-1 px-3 rounded-full shadow-md transition duration-300 disabled:opacity-50"
            >
              {userRating === null ? "Add Rating" : "Update Rating"}
            </button>
            {userRating !== null && (
              <button
                onClick={openDeleteModal}
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-full shadow-md transition duration-300 disabled:opacity-50"
              >
                Delete Rating
              </button>
            )}
          </div>
        </div>
      )}

      {showRatingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">
              {userRating === null ? "Add Rating" : "Update Rating"}
            </h2>
            <div className="flex justify-center mb-4">
              {renderStarsWithClick(selectedRating)}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeRatingModal}
                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-full shadow-md transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-1 px-3 rounded-full shadow-md transition duration-300"
              >
                {userRating === null ? "Add" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Delete Rating</h2>
            <p>Are you sure you want to delete your rating?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-full shadow-md transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteRating}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full shadow-md transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rating;
