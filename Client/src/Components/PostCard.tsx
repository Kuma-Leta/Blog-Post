import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Post {
  _id: string;
  title: string;
  author: string;
  textContent: string;
  imagePath?: string;
  videoContent?: string;
  postedAt: string;
  category: string;
  authorImage: string;
  ratingQuantity: number;
  averageRating: number;
  currentUserRating?: number;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const categoryStyles: { [key: string]: string } = {
    AI: "bg-blue-200 text-blue-800",
    "Software Development": "bg-green-200 text-green-800",
    "Cloud Computing": "bg-purple-200 text-purple-800",
    "Data Science": "bg-pink-200 text-pink-800",
    Blockchain: "bg-yellow-200 text-yellow-800",
    "Internet of Things (IoT)": "bg-red-200 text-red-800",
    DevOps: "bg-indigo-200 text-indigo-800",
    "Quantum Computing": "bg-teal-200 text-teal-800",
    Cybersecurity: "bg-orange-200 text-orange-800",
  };

  const responsiveCarousel = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="rounded-full px-3 py-1 text-sm font-semibold inline-block">
          <span className={categoryStyles[post.category]}>{post.category}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">{post.ratingQuantity} ratings</span>
          <span>Average rating: {post.averageRating.toFixed(1)}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
      <p className="text-gray-800 mb-4">
        {post.textContent.length > 100 ? (
          <>
            {post.textContent.substring(0, 100)}...
            <Link to={`/post/${post._id}`} className="text-blue-500 ml-1">
              See more
            </Link>
          </>
        ) : (
          post.textContent
        )}
      </p>
      <div className="flex items-center mb-4">
        <img
          src={`http://localhost:5000/uploads/${post.authorImage}`}
          alt={post.author}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">{post.author}</p>
          <p className="text-gray-600">{moment(post.createdAt).fromNow()}</p>
        </div>
      </div>

      {/* Media Content Rendering */}
      {post.imagePath && !post.videoContent && (
        <img
          src={`http://localhost:5000/${post.imagePath}`}
          alt={post.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      {post.videoContent && !post.imagePath && (
        <div className="relative h-48 mb-4">
          <video
            className="w-full h-full object-cover rounded-md"
            controls
            muted
          >
            <source
              src={`http://localhost:5000/${post.videoContent}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {post.imagePath && post.videoContent && (
        <Carousel
          responsive={responsiveCarousel}
          swipeable
          draggable
          showDots
          infinite
          autoPlay
          autoPlaySpeed={5000}
          keyBoardControl
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div>
            <img
              src={`http://localhost:5000/${post.imagePath}`}
              alt={post.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          </div>
          <div>
            <div className="relative h-48 mb-4">
              <video
                className="w-full h-full object-cover rounded-md"
                controls
                muted
              >
                <source
                  src={`http://localhost:5000/${post.videoContent}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default PostCard;
