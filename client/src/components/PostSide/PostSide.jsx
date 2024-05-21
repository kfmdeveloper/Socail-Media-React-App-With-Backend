import React from "react";
import SharePost from "./SharePost/SharePost";
import "./PostSide.css";
import Posts from "./Posts/Posts";
const PostSide = ({ posts }) => {
  return (
    <div className="PostSide">
      <SharePost />
      <Posts posts={posts} />
    </div>
  );
};

export default PostSide;
