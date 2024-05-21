import React from "react";
import ProfilePageLeft from "../../components/ProfilePage/ProfilePageLeft/ProfilePageLeft";
import "./ProfilePage.css";
import RightSide from "../../components/RightSide/RightSide";
import ProfileCard from "../../components/ProfileSide/ProfileCard/ProfileCard";
import PostSide from "../../components/PostSide/PostSide";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
const ProfilePage = () => {
  const { user, otherUsers } = useSelector((store) => store.user);
  // Render loading state if otherUsers is undefined or null

  return (
    <div className="ProfilePage">
      <ProfilePageLeft />
      <div className="ProfileCenter">
        <ProfileCard user={user} />
        <PostSide />
      </div>
      <RightSide otherUsers={otherUsers} />
    </div>
  );
};

export default ProfilePage;
