import React from "react";
import LogoSearch from "../../ProfileSide/LogoSearch/LogoSearch";
import InfoCard from "../InfoCard/InfoCard";
import FollowerCard from "../../ProfileSide/FollowerCard/FollowerCard";
import "./ProfilePageLeft.css";
const ProfilePageLeft = () => {
  return (
    <div className="ProfilePageLeft">
      <LogoSearch />
      <InfoCard />
      <FollowerCard />
    </div>
  );
};

export default ProfilePageLeft;
