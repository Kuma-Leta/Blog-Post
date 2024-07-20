/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { AxiosProgressEvent } from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/AuthenticatedNavbar";
import { FiArrowLeft } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFileImage,
  faFileVideo,
} from "@fortawesome/free-solid-svg-icons";
import SuccessMessage from "../Components/Profile/UserProfile/SuccessMessage";

import { BASE_URL } from "../config";
import api from "../axiosConfig";

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
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const categories = [
    "All",
    "AI",
    "Software Development",
    "Cloud Computing",
    "Data Science",
    "Blockchain",
    "Internet of Things (IoT)",
    "DevOps",
    "Quantum Computing",
    "Cybersecurity",
  ];

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await api.get(`/post/getPost/${id}`);

        const post = response.data.data.post;
        setTitle(post.title);
        setContent(post.textContent);
        setCategory(post.category);
        setImagePath(post.imagePath);
        setVideoPath(post.videoContent);

        window.scrollTo(0, 0);
      } catch (error) {
        setError("Error fetching post data.");
        window.scrollTo(0, 0);
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
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
          );
          setUploadProgress(progress);
        },
      };

      await api.patch(`/post/update/${id}`, formData, config);

      setMessage("Post updated successfully");
      setImageFile(null);
      setVideoFile(null);
      setLoading(false);
      window.scrollTo(0, 0);
    } catch (error: any) {
      console.error("Error updating post front-end:", error.message);
      console.log(uploadProgress);
      setLoading(false);
      setError("Failed to update post. Please try again.");
      window.scrollTo(0, 0);
    }
  };

  const handleSuccessMessageClose = () => {
    setMessage(null);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg px-10 pt-8 pb-8 mb-6 border border-gray-300"
        >
          {message && (
            <SuccessMessage
              message={message}
              onClose={handleSuccessMessageClose}
            />
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setError(null)}
              >
                <svg
                  className="h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.293 5.293a1 1 0 00-1.414 0L10 8.586 6.707 5.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 101.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10l3.293-3.293a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => navigate(-1)}
            >
              <FiArrowLeft className="text-3xl" />
            </button>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faEdit} className="mr-2 text-purple-600" />{" "}
              Edit Post
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-lg"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-lg"
              placeholder="Write your content here..."
            />
          </div>
          <div className="relative mb-6">
            <label
              htmlFor="category"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
              }}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-4 py-2 rounded-full w-full text-left flex justify-between items-center shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
            >
              {category || "Select a category"}
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  isCategoryDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {isCategoryDropdownOpen && (
              <ul className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto border border-gray-300 transition duration-300">
                {categories.map((categoryOption, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setCategory(categoryOption);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white transition duration-300 ${
                        category === categoryOption
                          ? "bg-gray-300 font-bold text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {categoryOption}
                    </button>
                  </li>
                ))}
              </ul>
            )}
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
                src={`${BASE_URL}/${imagePath}`}
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
                src={`${BASE_URL}/${videoPath}`}
                controls
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm"
              ></video>
            </div>
          )}
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Update Image
            </label>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="imageUpload"
                className="flex items-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer transition duration-300"
              >
                <FontAwesomeIcon icon={faFileImage} className="mr-2" />
                <span>Select Image</span>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </label>
              {imageFile && (
                <span className="text-sm text-gray-500">{imageFile.name}</span>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="video"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Update Video
            </label>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="videoUpload"
                className="flex items-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer transition duration-300"
              >
                <FontAwesomeIcon icon={faFileVideo} className="mr-2" />
                <span>Select Video</span>
                <input
                  type="file"
                  id="videoUpload"
                  accept="video/*"
                  className="sr-only"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                />
              </label>
              {videoFile && (
                <span className="text-sm text-gray-500">{videoFile.name}</span>
              )}
            </div>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-4 py-2 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
