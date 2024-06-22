import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Navbar from "../AuthenticatedNavbar";
import { useUser } from "../../UserContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Post {
  _id: string;
  title: string;
  author: string;
  textContent: string;
  imagePath?: string;
  createdAt: string;
  category: string;
  authorImage: string;
  ratingQuantity: number;
  averageRating: number;
  videoContent?: string;
}

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:5000/api/v1/post/getPost/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPost(response.data.data.post);
        fetchRelatedPosts(response.data.data.post.category);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedPosts = async (category: string) => {
      try {
        const currentPage = 1;
        const limit = 5;
        let url = `http://localhost:5000/api/v1/post/getAllposts?page=${currentPage}&limit=${limit}`;
        if (category && category !== "All") {
          url += `&category=${category}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          console.log(data.data.data);
          setRelatedPosts(data.data.data);
        } else {
          console.error("Error fetching related posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    fetchPost();
  }, [postId]);

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

  const isAuthor = user && user.name === post.author;

  const useCarousel =
    (post.imagePath && post.videoContent) ||
    (post.imagePath && post.imagePath.includes(",")) ||
    (post.videoContent && post.imagePath);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 mb-4"
        >
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
          Go Back
        </button>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {post.title}
          </h1>
          {useCarousel ? (
            <Carousel showThumbs={false} showStatus={false}>
              {post.imagePath &&
                post.imagePath.split(",").map((image, index) => (
                  <div key={index}>
                    <img
                      src={`http://localhost:5000/${image.trim()}`}
                      alt={post.title}
                      className="w-full rounded-lg mb-4 shadow-lg object-cover"
                      style={{ maxHeight: "20rem" }}
                    />
                  </div>
                ))}
              {post.videoContent && (
                <div>
                  <video
                    controls
                    className="w-full rounded-lg mb-4 shadow-lg object-cover"
                    style={{ outline: "none", maxHeight: "20rem" }}
                  >
                    <source
                      src={`http://localhost:5000/${post.videoContent}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </Carousel>
          ) : (
            <div className="flex items-center mb-4">
              {post.imagePath && (
                <img
                  src={`http://localhost:5000/${post.imagePath}`}
                  alt={post.title}
                  className="w-full rounded-lg mb-4 shadow-lg object-cover"
                  style={{ maxHeight: "20rem" }}
                />
              )}
              {post.videoContent && (
                <video
                  controls
                  className="w-full rounded-lg mb-4 shadow-lg object-cover"
                  style={{ outline: "none", maxHeight: "20rem" }}
                >
                  <source
                    src={`http://localhost:5000/${post.videoContent}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
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
          <div
            className="text-gray-700 whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.textContent }}
          />
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
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Related Posts
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedPosts.map((relatedPost) => (
              <li
                key={relatedPost._id}
                className="bg-gray-50 rounded-lg shadow-md p-4 flex items-center space-x-4"
              >
                {relatedPost.imagePath && (
                  <img
                    src={`http://localhost:5000/${relatedPost.imagePath
                      .split(",")[0]
                      .trim()}`}
                    alt={relatedPost.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div>
                  <Link
                    to={`/post/${relatedPost._id}`}
                    className="text-blue-500 hover:underline font-semibold"
                  >
                    {relatedPost.title}
                  </Link>
                  <p className="text-gray-600 text-sm">
                    {moment(relatedPost.createdAt).format("MMMM Do YYYY")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
