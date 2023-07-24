import React from "react";
import "./Styles.Header.css";
import HeaderButton from "../header-button";

const Header = () => {
  return (
    <div className="header-container">
      <img src={require("../../assets/images/headericon.png")} />
      <div className="header-right-container">
        <HeaderButton />
      </div>
    </div>
  );
};

export default Header;
