import React from "react";
import "./Styles.Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <img src={require("../../assets/images/headericon.png")} />
      <div className="header-right-container">
        <div className="header-button">
          <img src={require("../../assets/images/avatar.png")} />
          <span className="header-button-title">Giriş yap</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
