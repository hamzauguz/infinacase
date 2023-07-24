import React from "react";
import "./Styles.HeaderButton.css";

const HeaderButton = () => {
  return (
    <div className="header-button">
      <img src={require("../../assets/images/avatar.png")} />
      <div className="count-basket">5</div>
      <span className="header-button-title">Giriş yap</span>
    </div>
  );
};

export default HeaderButton;
