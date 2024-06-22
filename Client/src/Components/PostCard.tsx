import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MdClose } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faClock,
  faUser,
  faEye,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

interface Post {
  _id: string;
  title: string;
  author: string;
  textContent: string;
  imagePath?: string;
  videoContent?: string;
  createdAt: string;
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
  const [showMediaPopup, setShowMediaPopup] = useState(false);
  const [popupMedia, setPopupMedia] = useState<string | null>(null);
  const [popupMediaType, setPopupMediaType] = useState<
    "image" | "video" | null
  >(null);

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

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closeMediaPopup();
      }
    };

    if (showMediaPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMediaPopup]);

  const openMediaPopup = (mediaUrl: string, type: "image" | "video") => {
    setPopupMedia(mediaUrl);
    setPopupMediaType(type);
    setShowMediaPopup(true);
  };

  const closeMediaPopup = () => {
    setShowMediaPopup(false);
    setPopupMedia(null);
    setPopupMediaType(null);
  };

  const renderMediaContent = () => {
    if (!popupMedia) return null;

    if (popupMediaType === "video") {
      return (
        <video
          controls
          autoPlay
          className="w-full h-full object-cover rounded-md outline-none"
        >
          <source src={popupMedia} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <img
          src={popupMedia}
          alt="Popup Media"
          className="w-full h-full object-contain rounded-md"
        />
      );
    }
  };

  const handleVideoBodyClick = (
    e: React.MouseEvent<HTMLDivElement>,
    mediaUrl: string
  ) => {
    if (
      e.target.tagName !== "VIDEO" &&
      e.target.tagName !== "SOURCE" &&
      e.target.tagName !== "BUTTON"
    ) {
      openMediaPopup(mediaUrl, "video");
    }
  };

  return (
    <div className="relative">
      <div className="bg-white p-6 rounded-lg shadow-md transition-shadow duration-300 cursor-pointer hover:shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span
              className={
                categoryStyles[post.category] +
                " rounded-full px-3 py-1 text-sm font-semibold inline-block"
              }
            >
              <FontAwesomeIcon icon={faCoffee} className="mr-2" />
              {post.category}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-500" />
            <span className="mr-2">{post.ratingQuantity} ratings</span>
            <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-500" />
            <span>Average rating: {post.averageRating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-800 mb-4">
          {post.textContent.length > 100 ? (
            <>
              {post.textContent.substring(0, 100)}...
              <Link
                to={`/post/${post._id}`}
                className="text-blue-500 ml-1 flex items-center"
              >
                <FontAwesomeIcon icon={faEye} className="mr-1" />
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
            <p className="text-gray-900 leading-none flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-1" />
              {post.author}
            </p>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              {moment(post.createdAt).fromNow()}
            </p>
          </div>
        </div>

        {/* Media Content Rendering */}
        {post.imagePath && !post.videoContent && (
          <img
            src={`http://localhost:5000/${post.imagePath}`}
            alt={post.title}
            className="w-full h-48 object-cover rounded-md mb-4"
            onClick={() =>
              openMediaPopup(`http://localhost:5000/${post.imagePath}`, "image")
            }
          />
        )}

        {post.videoContent && !post.imagePath && (
          <div
            className="relative h-48 mb-4"
            onClick={(e) =>
              handleVideoBodyClick(
                e,
                `http://localhost:5000/${post.videoContent}`
              )
            }
          >
            <video className="w-full h-full object-cover rounded-md" controls>
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
            showDots={!showMediaPopup} // Hide dots when media popup is shown
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
                onClick={() =>
                  openMediaPopup(
                    `http://localhost:5000/${post.imagePath}`,
                    "image"
                  )
                }
              />
            </div>
            <div>
              <div
                className="relative h-48 mb-4"
                onClick={(e) =>
                  handleVideoBodyClick(
                    e,
                    `http://localhost:5000/${post.videoContent}`
                  )
                }
              >
                <video
                  className="w-full h-full object-cover rounded-md"
                  controls
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

      {/* Media Popup */}
      {showMediaPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            ref={popupRef}
            className="relative max-w-screen-lg max-h-screen mx-auto"
          >
            <div
              className="absolute top-0 right-0 m-4 cursor-pointer text-white text-3xl"
              onClick={closeMediaPopup}
            >
              <MdClose />
            </div>
            <div className="w-full h-full flex items-center justify-center">
              {renderMediaContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
