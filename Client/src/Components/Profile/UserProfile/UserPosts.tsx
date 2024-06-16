import React from "react";

interface UserPostsProps {
  posts: any[];
}

const UserPosts: React.FC<UserPostsProps> = ({ posts }) => (
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Posts</div>
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      {posts.map((post, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded shadow">
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p className="text-gray-700">{post.content}</p>
        </div>
      ))}
    </div>
  </div>
);

export default UserPosts;
