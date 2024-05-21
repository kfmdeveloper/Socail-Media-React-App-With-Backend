import React from "react";
import "./ProfileCard.css";
import cover from "../../../img/cover.jpg";
import profile from "../../../img/profileImg.jpg";
import { Link } from "react-router-dom";

const ProfileCard = ({ user }) => {
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={cover} alt="" />
        <img src={profile} alt="" />
      </div>
      <div className="ProfileName">
        <span>{user.name}</span>
        <span>@{user.username}</span>
      </div>

      <div className="FollowStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
        </div>
        <hr />
      </div>
      {
        <span>
          <Link style={{ color: "orange" }} to={"/profile"}>
            My Profile
          </Link>
        </span>
      }
    </div>
  );
};

export default ProfileCard;
