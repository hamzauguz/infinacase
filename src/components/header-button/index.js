import React from "react";
import "./Styles.HeaderButton.css";

const HeaderButton = ({ src, title, onClick, basketPlace, basketCount }) => {
  return (
    <div onClick={onClick} className="header-button">
      <img src={src} />
      {basketPlace && <div className="count-basket">{basketCount}</div>}
      <span className="header-button-title">{title}</span>
    </div>
  );
};

export default HeaderButton;
