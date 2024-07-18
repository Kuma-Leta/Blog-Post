import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Post } from "../../Pages/PostDetail"; // Assuming Post interface is exported from PostDetail
import { BsArrowRight } from "react-icons/bs"; // Example arrow icon, import others as needed

interface RelatedPostsProps {
  relatedPosts: Post[];
  category: string;
}

const RelatedPostsSection: React.FC<RelatedPostsProps> = ({ relatedPosts }) => {
  const [displayedRelatedPosts, setDisplayedRelatedPosts] = useState<Post[]>(
    []
  );

  useEffect(() => {
    if (relatedPosts.length > 0) {
      setDisplayedRelatedPosts(relatedPosts.slice(0, 6));
    }
  }, [relatedPosts]);

  const loadMoreRelatedPosts = () => {
    const nextPosts = relatedPosts.slice(
      displayedRelatedPosts.length,
      displayedRelatedPosts.length + 6
    );
    setDisplayedRelatedPosts([...displayedRelatedPosts, ...nextPosts]);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Related Posts</h2>
      <div
        className="overflow-y-auto max-h-80 md:max-h-96"
        style={{ maxHeight: "320px" }}
      >
        {displayedRelatedPosts.map((relatedPost) => (
          <div key={relatedPost._id} className="mb-4 flex">
            {relatedPost.imagePath && (
              <img
                src={`http://localhost:5000/${relatedPost.imagePath}`}
                alt={relatedPost.title}
                className="h-20 w-20 object-cover rounded-lg mr-4"
              />
            )}
            <div>
              <Link
                to={`/post/${relatedPost._id}`}
                className="text-blue-500 hover:underline"
              >
                {relatedPost.title}
              </Link>
              <p className="text-gray-500 text-sm">
                {moment(relatedPost.createdAt).format("MMMM Do YYYY")}
              </p>
            </div>
          </div>
        ))}
      </div>
      {relatedPosts.length > displayedRelatedPosts.length && (
        <div className="mt-4">
          <button
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-md transition duration-300 disabled:opacity-50"
            onClick={loadMoreRelatedPosts}
          >
            See More <BsArrowRight className="inline-block ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedPostsSection;
