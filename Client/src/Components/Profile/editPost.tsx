import React, { useState, useEffect } from "react";
import axios, { AxiosProgressEvent } from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../AuthenticatedNavbar";
import { FiArrowLeft } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFileImage,
  faFileVideo,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [videoPath, setVideoPath] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/post/getPost/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const post = response.data.data.post;
        setTitle(post.title);
        setContent(post.textContent);
        setCategory(post.category);
        setImagePath(post.imagePath);
        setVideoPath(post.videoContent);
      } catch (error) {
        setError("Error fetching post data.");
      }
    };

    fetchPostData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("textContent", content);
      formData.append("category", category);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (videoFile) {
        formData.append("video", videoFile);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
          );
          setUploadProgress(progress);
        },
      };

      const response = await axios.patch(
        `http://localhost:5000/api/v1/post/update/${id}`,
        formData,
        config
      );

      setMessage("Post updated successfully");
      setImageFile(null);
      setVideoFile(null);
      setLoading(false);
    } catch (error) {
      console.error("Error updating post front-end:", error.message);
      setLoading(false);
      setError("Failed to update post. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg px-10 pt-8 pb-8 mb-6 border border-blue-300"
        >
          <div className="flex items-center justify-between mb-6">
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => navigate(-1)}
            >
              <FiArrowLeft className="text-3xl" />
            </button>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit Post
            </h2>
          </div>

          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              placeholder="Enter title..."
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={5}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              placeholder="Write your content here..."
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
            >
              <option value="">Select a category</option>
              <option value="AI">AI</option>
              <option value="Software Development">Software Development</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Data Science">Data Science</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Internet of Things (IoT)">
                Internet of Things (IoT)
              </option>
              <option value="DevOps">DevOps</option>
              <option value="Quantum Computing">Quantum Computing</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div>
          {imagePath && (
            <div className="mb-6">
              <label
                htmlFor="currentImage"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Current Image
              </label>
              <img
                src={`http://localhost:5000/${imagePath}`}
                alt="Current Image"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          )}
          {videoPath && (
            <div className="mb-6">
              <label
                htmlFor="currentVideo"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Current Video
              </label>
              <video
                controls
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm"
              >
                <source
                  src={`http://localhost:5000/${videoPath}`}
                  type="video/mp4"
                />{" "}
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              <FontAwesomeIcon icon={faFileImage} className="mr-2" /> Update
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
            />
            {imageFile && (
              <p className="text-gray-500 mt-2">Uploading: {uploadProgress}%</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="video"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              <FontAwesomeIcon icon={faFileVideo} className="mr-2" /> Update
              Video
            </label>
            <input
              type="file"
              id="video"
              onChange={(e) =>
                setVideoFile(e.target.files ? e.target.files[0] : null)
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
            />
            {videoFile && (
              <p className="text-gray-500 mt-2">Uploading: {uploadProgress}%</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md hover:from-blue-600 hover:to-blue-800 transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } flex items-center justify-center`}
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              {loading ? "Updating..." : "Update Post"}
            </button>
          </div>
          {message && (
            <p className="text-green-500 mt-6 text-center">{message}</p>
          )}
          {error && <p className="text-red-500 mt-6 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditPost;
