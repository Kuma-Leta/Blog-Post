import React, { useState, useEffect, useRef } from "react";
import PostHeader from "./PostCard/PostHeader";
import PostContent from "./PostCard/PostContent";
import AuthorInfo from "./PostCard/AuthorInfo";
import MediaContent from "./PostCard/MediaContent";
import MediaPopup from "./PostCard/MediaPopup";
import CategoryBadge from "./PostCard/CategoryBadge";

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

  const handleVideoBodyClick = (
    e: React.MouseEvent<HTMLDivElement>,
    mediaUrl: string
  ) => {
    e.stopPropagation();
    openMediaPopup(mediaUrl, "video");
  };

  const renderMediaContent = () => {
    if (!popupMedia) return null;

    if (popupMediaType === "video") {
      return (
        <video
          controls
          autoPlay
          className="w-full h-full object-cover rounded-t-lg outline-none"
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
          className="w-full h-full object-cover rounded-t-lg"
        />
      );
    }
  };

  return (
    <div className="relative">
      <div className="bg-white  rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
        <div className="relative">
          <MediaContent
            imagePath={post.imagePath}
            videoContent={post.videoContent}
            openMediaPopup={openMediaPopup}
            handleVideoBodyClick={handleVideoBodyClick}
            showMediaPopup={showMediaPopup}
            responsiveCarousel={responsiveCarousel}
          />
          {/* Category badge in the top right corner of the media */}
          <div className="absolute top-0 right-0 m-2">
            <CategoryBadge
              category={post.category}
              categoryStyles={categoryStyles}
            />
          </div>
        </div>
        <PostHeader
          ratingQuantity={post.ratingQuantity}
          averageRating={post.averageRating}
        />
        <PostContent
          _id={post._id}
          title={post.title}
          textContent={post.textContent}
        />
        <AuthorInfo
          author={post.author}
          authorImage={post.authorImage}
          createdAt={post.createdAt}
        />
      </div>
      <MediaPopup
        showMediaPopup={showMediaPopup}
        popupRef={popupRef}
        closeMediaPopup={closeMediaPopup}
        renderMediaContent={renderMediaContent}
      />
    </div>
  );
};

export default PostCard;
