import React from "react";
import "./LogoSearch.css";
import Logo from "../../../img/logo.png";
import { RiSearchLine } from "react-icons/ri";
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="SearchInput">
        <input type="text" placeholder="#Explore" />
        <div className="SearchIcon">
          <RiSearchLine size={25} color="white" />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
