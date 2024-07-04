import React from "react";
import { MdClose } from "react-icons/md";

interface MediaPopupProps {
  showMediaPopup: boolean;
  popupRef: React.RefObject<HTMLDivElement>;
  closeMediaPopup: () => void;
  renderMediaContent: () => JSX.Element | null;
}

const MediaPopup: React.FC<MediaPopupProps> = ({
  showMediaPopup,
  popupRef,
  closeMediaPopup,
  renderMediaContent,
}) => {
  return (
    <>
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
    </>
  );
};

export default MediaPopup;
