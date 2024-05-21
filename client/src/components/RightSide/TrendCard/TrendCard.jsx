import React from "react";
import "./TrendCard.css";
import { trendCard } from "../../../Data/TrendCard";
const TrendCard = () => {
  return (
    <div className="TrendCard">
      <h3>Trends for your</h3>
      <div>
        {trendCard.map((trend, id) => {
          return (
            <div key={id} className="trend">
              <span style={{ fontWeight: "bold" }}>{trend.name}</span>
              <span style={{ color: "gray", fontSize: "13px" }}>
                {trend.shares}K shares
              </span>
            </div>
          );
        })}
        <button className="sharebtn">Share</button>
      </div>
    </div>
  );
};

export default TrendCard;
