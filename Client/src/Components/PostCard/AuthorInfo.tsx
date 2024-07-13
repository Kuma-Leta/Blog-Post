import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

interface AuthorInfoProps {
  author: string;
  authorImage: string;
  createdAt: string;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({
  author,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authorImage,
  createdAt,
}) => {
  return (
    <div className="flex items-center mb-4 px-4 py-2">
      <img
        src={authorImage}
        alt={author}
        className="w-10 h-10 rounded-full mr-4"
      />
      <div className="text-sm">
        <p className="text-gray-900 leading-none flex items-center">
          <FontAwesomeIcon icon={faUser} className="mr-1" />
          {author}
        </p>
        <p className="text-gray-600 flex items-center">
          <FontAwesomeIcon icon={faClock} className="mr-1" />
          {moment(createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default AuthorInfo;
