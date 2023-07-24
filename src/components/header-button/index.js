import React from "react";
import "./Styles.HeaderButton.css";

const HeaderButton = ({ src, title, basketPlace, basketCount }) => {
  return (
    <div className="header-button">
      <img src={src} />
      {basketPlace && <div className="count-basket">{basketCount}</div>}
      <span className="header-button-title">{title}</span>
    </div>
  );
};

export default HeaderButton;
