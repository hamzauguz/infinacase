import React from "react";
import "./Styles.HeaderButton.css";

const HeaderButton = ({
  src,
  title,
  onClick,
  basketPlace,
  basketCount,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="header-button"
    >
      <img className="header-icon" src={src} />
      {basketPlace && <div className="count-basket">{basketCount}</div>}
      <span className="header-button-title">{title}</span>
    </div>
  );
};

export default HeaderButton;
