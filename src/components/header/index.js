import React from "react";
import "./Styles.Header.css";
import HeaderButton from "../header-button";

const Header = () => {
  return (
    <div className="header-container">
      <img src={require("../../assets/images/headericon.png")} />
      <div className="header-right-container">
        <HeaderButton
          src={require("../../assets/images/avatar.png")}
          //   basketPlace
          //   basketCount={2}
          title={"Giriş Yap"}
        />
      </div>
    </div>
  );
};

export default Header;
