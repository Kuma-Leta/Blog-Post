import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface MediaContentProps {
  imagePath?: string;
  videoContent?: string;
  openMediaPopup: (mediaUrl: string, type: "image" | "video") => void;
  handleVideoBodyClick: (
    e: React.MouseEvent<HTMLDivElement>,
    mediaUrl: string
  ) => void;
  showMediaPopup: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responsiveCarousel: any;
}

const MediaContent: React.FC<MediaContentProps> = ({
  imagePath,
  videoContent,
  openMediaPopup,
  handleVideoBodyClick,
  showMediaPopup,
  responsiveCarousel,
}) => {
  const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
    >
      <FaArrowLeft />
    </button>
  );

  const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
    >
      <FaArrowRight />
    </button>
  );

  const mediaContainerStyles =
    "w-[394px] h-[192px] flex justify-center items-center bg-gray-200 mb-4 rounded-md overflow-hidden";

  return (
    <>
      {imagePath && !videoContent && (
        <div
          className={mediaContainerStyles}
          onClick={() =>
            openMediaPopup(`http://localhost:5000/${imagePath}`, "image")
          }
        >
          <img
            src={`http://localhost:5000/${imagePath}`}
            alt="Media Content"
            className="h-full min-w-fit object-contain cursor-pointer"
          />
        </div>
      )}

      {videoContent && !imagePath && (
        <div
          className={mediaContainerStyles}
          onClick={(e) =>
            handleVideoBodyClick(e, `http://localhost:5000/${videoContent}`)
          }
        >
          <video
            className="object-contain w-full h-full cursor-pointer"
            controls
            onClick={(e) => e.stopPropagation()}
          >
            <source
              src={`http://localhost:5000/${videoContent}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {imagePath && videoContent && (
        <Carousel
          responsive={responsiveCarousel}
          swipeable
          draggable
          showDots={!showMediaPopup}
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
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          <div
            className={mediaContainerStyles}
            onClick={() =>
              openMediaPopup(`http://localhost:5000/${imagePath}`, "image")
            }
          >
            <img
              src={`http://localhost:5000/${imagePath}`}
              alt="Media Content"
              className="object-contain w-full h-full cursor-pointer"
            />
          </div>
          <div
            className={mediaContainerStyles}
            onClick={(e) =>
              handleVideoBodyClick(e, `http://localhost:5000/${videoContent}`)
            }
          >
            <video
              className="object-contain w-full h-full cursor-pointer"
              controls
              onClick={(e) => e.stopPropagation()}
            >
              <source
                src={`http://localhost:5000/${videoContent}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </Carousel>
      )}
    </>
  );
};

export default MediaContent;
