import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/AuthenticatedNavbar";
import { useUser } from "../UserContext";
import { FaArrowLeft, FaEdit, FaTrash, FaArrowRight } from "react-icons/fa";
import SuccessMessage from "../Components/Profile/UserProfile/SuccessMessage";
import RelatedPostsSection from "../Components/Posts/RelatedPostsSection";
import Rating from "../Components/Posts/Rating";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import generic_image from "../../public/generic_user_place_holder.jpg";
import { BASE_URL } from "../config";

export interface Post {
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
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>("image");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${BASE_URL}/api/v1/post/getPost/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPost(response.data.data.post);
        fetchRelatedPosts(response.data.data.post.category);

        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedPosts = async (category: string) => {
      try {
        let url = `${BASE_URL}/api/v1/post/getAllposts`;
        if (category && category !== "All") {
          url += `?category=${category}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setRelatedPosts(data.data);
        } else {
          console.error("Error fetching related posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleEdit = (postId: string) => {
    navigate(`/profile/editPost/${postId}`);
  };

  const handleDelete = async (postId: string) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${BASE_URL}/api/v1/post/deletePost/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPostToDelete(null);
      setSuccessMessage("Post deleted successfully!");
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const isAuthor = user && user.name === post?.author;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const images = post.imagePath ? post.imagePath.split(",") : [];
  const videos = post.videoContent ? post.videoContent.split(",") : [];
  const hasImages = images.length > 0;
  const hasVideos = videos.length > 0;

  const useGallery = hasImages || hasVideos;

  const toggleMediaType = () => {
    setMediaType((prevType) => (prevType === "image" ? "video" : "image"));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8 max-w-5xl flex gap-5">
        <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
          {successMessage && (
            <SuccessMessage
              message={successMessage}
              onClose={() => setSuccessMessage(null)}
            />
          )}
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft className="inline mr-2" /> Go Back
            </button>
          </div>
          <div className="flex items-center mb-4">
            <img
              src={generic_image}
              alt={post.author}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <p className="text-gray-600">{post.author}</p>
              <p className="text-gray-500 text-sm">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mb-4 relative">
            {useGallery && (
              <>
                {mediaType === "image" && hasImages && (
                  <Carousel
                    additionalTransfrom={0}
                    arrows={false}
                    draggable={false}
                    swipeable={false}
                    slidesToSlide={1}
                    responsive={{
                      superLargeDesktop: {
                        breakpoint: { max: 4000, min: 3000 },
                        items: 1,
                      },
                      desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 1,
                      },
                      tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 1,
                      },
                      mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 1,
                      },
                    }}
                  >
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={`${BASE_URL}/${image}`}
                        alt={`Post image ${index + 1}`}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    ))}
                  </Carousel>
                )}
                {mediaType === "video" && hasVideos && (
                  <video
                    src={`${BASE_URL}/${videos[0]}`}
                    controls
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                )}
                {hasImages && hasVideos && (
                  <button
                    className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                    onClick={toggleMediaType}
                  >
                    {mediaType === "image" ? (
                      <FaArrowRight className="text-gray-600" />
                    ) : (
                      <FaArrowLeft className="text-gray-600" />
                    )}
                  </button>
                )}
              </>
            )}
          </div>

          <div className="text-gray-800">
            <span className="text-xs text-white py-1 rounded-full px-4 bg-purple-500 uppercase font-semibold mr-2 ">
              {post.category}
            </span>
            <p className="">{post.textContent}</p>
          </div>
          <div className="mt-4">
            <Rating postId={postId} user={user} />
          </div>

          {isAuthor && (
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => handleEdit(post._id)}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-1 px-3 rounded-full shadow-md transition duration-300 disabled:opacity-50 flex  justify-center items-center"
              >
                <FaEdit className="mr-2" /> Edit Post
              </button>
              <button
                onClick={() => setPostToDelete(post._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 shadow-md transition duration-300 flex justify-center items-center"
              >
                <FaTrash className="mr-2" /> Delete Post
              </button>
            </div>
          )}
        </div>

        <div className="w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Related Posts</h3>
            <RelatedPostsSection relatedPosts={relatedPosts} category={""} />
          </div>
        </div>
      </div>

      {postToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this post?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setPostToDelete(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-md mr-4"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(postToDelete)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md"
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

export default PostDetail;
