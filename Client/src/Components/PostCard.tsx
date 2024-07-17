import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { FaRegBookmark, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MediaPopup from "./PostCard/MediaPopup";
import PostHeader from "./PostCard/PostHeader";
import AuthorInfo from "./PostCard/AuthorInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import generic_image from "../../public/generic_user_place_holder.jpg";

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
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

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

  const openMediaPopup = (mediaUrl: string, type: string) => {
    if (type === "image") {
      setPopupMedia(mediaUrl);
      setPopupMediaType(type);
      setShowMediaPopup(true);
    }
  };

  const closeMediaPopup = () => {
    setShowMediaPopup(false);
    setPopupMedia(null);
    setPopupMediaType(null);
  };

  const handlePreviousMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  const handleNextMedia = () => {
    if (currentMediaIndex < 1) {
      // Assuming there are only two media (image and video)
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  console.log(post);
  const mediaItems = [
    {
      type: "image",
      url: `http://localhost:5000/${post.imagePath}`,
    },
    {
      type: "video",
      url: `http://localhost:5000/${post.videoContent}`,
    },
  ];

  return (
    <Card sx={{ maxWidth: 394 }}>
      <div
        style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}
      >
        {mediaItems.map(
          (media, index) =>
            index === currentMediaIndex && (
              <CardMedia
                key={index}
                component={media.type === "image" ? "img" : "video"}
                image={media.url}
                title={post.title}
                onClick={() => openMediaPopup(media.url, media.type)}
                className="cursor-pointer rounded-md"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 1,
                  display: index === currentMediaIndex ? "block" : "none",
                }}
                controls={media.type === "video"}
              />
            )
        )}
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <FaArrowLeft
            className="cursor-pointer"
            onClick={handlePreviousMedia}
            style={{
              visibility: currentMediaIndex === 0 ? "hidden" : "visible",
            }}
          />
          <FaArrowRight
            className="cursor-pointer"
            onClick={handleNextMedia}
            style={{
              visibility: currentMediaIndex === 1 ? "hidden" : "visible",
            }}
          />
        </div>
      </div>

      <CardContent>
        <div className="flex items-center mb-2 gap-2">
          <FaRegBookmark className="text-purple-500" />
          <span className="text-xs text-white py-1 rounded-full px-4 bg-purple-500 uppercase font-semibold mr-2">
            {post.category}
          </span>
        </div>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.textContent.length > 50 ? (
            <>
              {post.textContent.substring(0, 50)}...
              <Link
                to={`/post/${post._id}`}
                className="text-purple-500 ml-1 flex items-center cursor-pointer"
              >
                <FontAwesomeIcon icon={faEye} className="mr-1" />
                See more
              </Link>
            </>
          ) : (
            post.textContent
          )}
        </Typography>
      </CardContent>

      <div className="">
        <PostHeader
          ratingQuantity={post.ratingQuantity}
          averageRating={post.averageRating}
        />
        <AuthorInfo
          author={post.author}
          authorImage={generic_image}
          createdAt={post.createdAt}
        />
      </div>

      <MediaPopup
        showMediaPopup={showMediaPopup}
        popupRef={popupRef}
        closeMediaPopup={closeMediaPopup}
        renderMediaContent={() => {
          if (popupMediaType === "image") {
            return (
              <img
                src={popupMedia ?? ""}
                alt="Popup Media"
                className="w-full h-full object-cover rounded-t-lg"
              />
            );
          } else if (popupMediaType === "video") {
            return (
              <video
                src={popupMedia ?? ""}
                className="w-full h-full object-cover rounded-t-lg"
                controls
              />
            );
          } else {
            return null;
          }
        }}
      />
    </Card>
  );
};

export default PostCard;
