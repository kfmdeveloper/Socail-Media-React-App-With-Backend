import React from "react";
import "./Home.css";
import ProfileSide from "../../components/ProfileSide/ProfileSide";
import PostSide from "../../components/PostSide/PostSide";
import RightSide from "../../components/RightSide/RightSide";
import useGetOtherUsers from "../../Hook/useGetOtherUsers";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useGetPOSTS from "../../Hook/useGetPosts";

const Home = () => {
  const { user } = useSelector((store) => store.user);
  const { otherUsers, loading: usersLoading } = useGetOtherUsers(user?._id);
  const { posts } = useGetPOSTS(user?._id);

  // Render loading state if otherUsers or posts are loading
  if (usersLoading || !posts) {
    return <div>Loading...</div>;
  }

  console.log(posts);

  return (
    <div className="Home">
      <ProfileSide user={user} />
      <PostSide posts={posts} />
      <RightSide otherUsers={otherUsers} />
    </div>
  );
};

export default Home;
