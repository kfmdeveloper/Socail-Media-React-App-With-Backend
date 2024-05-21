import React from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import comment from "../../img/comment.png";
import Noti from "../../img/noti.png";
import { RiSettings4Line } from "react-icons/ri";
import TrendCard from "./TrendCard/TrendCard";
import OtherUsers from "./OtherUsers";
const RightSide = ({ otherUsers }) => {
  return (
    <div className="RightSide">
      <div className="NavIcons">
        <img src={Home} alt="" />
        <RiSettings4Line size={25} />
        <img src={Noti} alt="" />
        <img src={comment} alt="" />
      </div>

      <OtherUsers otherUsers={otherUsers} />
      <TrendCard />
    </div>
  );
};

export default RightSide;
