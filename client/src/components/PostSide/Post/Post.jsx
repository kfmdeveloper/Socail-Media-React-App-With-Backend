import React from "react";
import "./Post.css";
import heart from "../../../img/like.png";
import notlike from "../../../img/notlike.png";
import comment from "../../../img/comment.png";
import share from "../../../img/share.png";
const Post = (data) => {
  return (
    <div className="Post">
      {data.post.image ? <img src={data.post.image} alt="" /> : null}

      <div className="PostReact">
        {data.post.likes.length > 0 ? (
          <div>
            <img src={heart} alt="" />
            <span className="mx-1">{data.post.likes.length}</span>
          </div>
        ) : (
          <img src={notlike} alt="" />
        )}
        <img src={comment} alt="" />
        <img src={share} alt="" />
      </div>
      <span style={{ color: "gray" }} className="likes">
        {data.post.likes.length} likes
      </span>
      <div className="PostsData">
        <span style={{ fontWeight: "bold" }}>{data.post.name}</span>
        <span>{data.post.desc}</span>
      </div>
    </div>
  );
};

export default Post;
