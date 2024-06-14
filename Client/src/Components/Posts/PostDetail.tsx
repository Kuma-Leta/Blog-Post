import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Navbar from "../AuthenticatedNavbar"; // Import authenticated navbar component
import { useUser } from "../../UserContext"; // Import useUser hook from UserContext

interface Post {
  _id: string;
  title: string;
  author: string;
  textContent: string;
  imagePath: string;
  postedAt: string;
  category: string;
  authorImage: string;
  ratingQuantity: number; // Add ratingQuantity and averageRating to Post interface
  averageRating: number;
}

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser(); // Get user from UserContext

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Fetch token from local storage
        const response = await axios.get(
          `http://localhost:5000/api/v1/post/getPost/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );
        setPost(response.data.data.post);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false); // Set loading to false whether successful or not
      }
    };

    fetchPost();
  }, [postId]);

  const handleRatingUpdate = () => {
    // Function to update ratings after a new rating is submitted
    axios
      .get(`http://localhost:5000/api/v1/rating?post=${postId}`)
      .then((response) => {
        const ratings = response.data.data;
        const totalRatings = ratings.length;
        const averageRating =
          totalRatings > 0
            ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings
            : 0;
        setPost((prevPost) => ({
          ...prevPost,
          ratingQuantity: totalRatings,
          averageRating,
        }));
      });
  };

  if (loading) {
    return <p className="text-center mt-8 text-gray-600">Loading...</p>;
  }

  if (!post) {
    return (
      <p className="text-center mt-8 text-gray-600">
        Error fetching post. Please try again later.
      </p>
    );
  }

  // Check if current user is the author of the post
  const isAuthor = user && user.name === post.author;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar isAuthenticated={true} username="John Doe" />{" "}
      {/* Example username */}
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Link to="/home" className="flex items-center text-blue-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            {post.title}
          </h1>
          <div className="flex items-center mb-4">
            <img
              src={`http://localhost:5000/${post.imagePath}`}
              alt={post.title}
              className="w-full rounded-lg mb-4 shadow-lg"
            />
          </div>
          <div className="flex items-center mb-4">
            <img
              src={`http://localhost:5000/${post.authorImage}`}
              alt={post.author}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-gray-700 font-semibold">{post.author}</p>
              <p className="text-gray-500">
                {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
          </div>
          <p className="text-gray-700">{post.textContent}</p>
          <div className="mt-4">
            <span className="inline-block bg-blue-200 text-blue-800 text-xs px-3 py-1 rounded-full">
              Category: {post.category}
            </span>
          </div>
          <div className="flex items-center mt-4">
            <p className="text-gray-600 mr-2">{post.ratingQuantity} ratings</p>
            <p className="text-gray-600">
              Average rating: {post.averageRating.toFixed(1)}
            </p>
          </div>
          {isAuthor && (
            <div className="mt-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2">
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
