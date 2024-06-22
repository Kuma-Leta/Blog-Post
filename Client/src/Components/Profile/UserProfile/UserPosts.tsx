import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Post {
  _id: string;
  title: string;
  author: string;
  category: string;
  createdAt: string;
  averageRating: number;
  textContent: string;
  imagePath: string;
  videoContent?: string;
}

interface UserPostsProps {
  posts: Post[];
}

const UserPosts: React.FC<UserPostsProps> = ({ posts }) => {
  const [visiblePostsCount, setVisiblePostsCount] = useState(3);

  const handleLoadMore = () => {
    setVisiblePostsCount((prevCount) => prevCount + 3);
  };

  // Sort posts by createdAt date in descending order
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="px-6 py-8 bg-gray-100 min-h-screen">
      <div className="font-bold text-3xl text-center mb-8 text-gray-800">
        Posts
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.slice(0, visiblePostsCount).map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            {(post.imagePath && post.imagePath.includes(",")) ||
            post.videoContent ? (
              <Carousel showThumbs={false}>
                {post.imagePath &&
                  post.imagePath.split(",").map((image, idx) => (
                    <div key={idx} className="h-32">
                      <img
                        src={`http://localhost:5000/${image
                          .trim()
                          .replace(/\\/g, "/")}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                {post.videoContent && (
                  <div className="h-32">
                    <video
                      controls
                      className="w-full h-full object-cover"
                      style={{ outline: "none" }}
                    >
                      <source
                        src={`http://localhost:5000/${post.videoContent.replace(
                          /\\/g,
                          "/"
                        )}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </Carousel>
            ) : (
              <>
                {post.imagePath && (
                  <img
                    src={`http://localhost:5000/${post.imagePath.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={post.title}
                    className="w-full h-32 object-cover"
                  />
                )}
                {post.videoContent && (
                  <video
                    controls
                    className="w-full h-32 object-cover"
                    style={{ outline: "none" }}
                  >
                    <source
                      src={`http://localhost:5000/${post.videoContent.replace(
                        /\\/g,
                        "/"
                      )}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
              </>
            )}

            <div className="p-6">
              <h3 className="font-bold text-2xl mb-2 text-gray-800 truncate-title">
                {post.title}
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{`By you`}</span>
                <span className="text-sm text-gray-500">{`Category: ${post.category}`}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="text-sm text-yellow-500">{`⭐ ${post.averageRating}`}</span>
              </div>
              <p className="text-gray-700 mb-4 truncate-content">
                {post.textContent.substring(0, 100)}...
              </p>
              <Link to={`/post/${post._id}`}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {visiblePostsCount < sortedPosts.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
