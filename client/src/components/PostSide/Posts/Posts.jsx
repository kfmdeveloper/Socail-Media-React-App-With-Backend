import React from "react";
import Post from "../Post/Post";
import "./Posts.css";

const Posts = ({ posts, onPostInteraction }) => {
  const handlePostInteraction = (postId) => {
    // Pass the selected post ID to the parent component
    onPostInteraction(postId);
  };

  return (
    <div className="Posts">
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          onInteraction={handlePostInteraction}
        />
      ))}
    </div>
  );
};

export default Posts;
