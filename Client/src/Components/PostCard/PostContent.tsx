import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

interface PostContentProps {
  _id: string;
  title: string;
  textContent: string;
}

const PostContent: React.FC<PostContentProps> = ({
  _id,
  title,
  textContent,
}) => {
  return (
    <>
      <h3 className="text-2xl font-bold mb-2 px-4">{title}</h3>
      <p className="text-gray-800 mb-4 px-4">
        {textContent.length > 100 ? (
          <>
            {textContent.substring(0, 50)}...
            <Link
              to={`/post/${_id}`}
              className="text-blue-500 ml-1 flex items-center cursor-pointer"
            >
              <FontAwesomeIcon icon={faEye} className="mr-1" />
              See more
            </Link>
          </>
        ) : (
          textContent
        )}
      </p>
    </>
  );
};

export default PostContent;
