import React from "react";
import LogoSearch from "./LogoSearch/LogoSearch";
import ProfileCard from "./ProfileCard/ProfileCard";
import "./ProfileSide.css";
import FollowerCard from "./FollowerCard/FollowerCard";

const ProfileSide = ({ user }) => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard user={user} />
      <FollowerCard />
    </div>
  );
};

export default ProfileSide;
