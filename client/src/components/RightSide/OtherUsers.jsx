import React, { useState } from "react";
import "../ProfileSide/FollowerCard/FollowerCard.css";
import profile from "../../img/profileImg.jpg";
const FollowerCard = ({ otherUsers }) => {
  return (
    <div className="FollowerCard">
      <div
        style={{ fontWeight: "bold" }}
        className=" bg-dark   text-white py-1 px-3 "
      >
        <h6>
          <strong>You may know</strong>
        </h6>
      </div>

      {otherUsers.OtherUsers.map((user) => {
        return (
          <div key={user._id} className="Follower">
            <div>
              <img src={profile} alt="" className="followerImg" />
              <div className="followername">
                <span>{user.name}</span>
                <span>@{user.username}</span>
              </div>
            </div>
            <button className="button fc-button">Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowerCard;
