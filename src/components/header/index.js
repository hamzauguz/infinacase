import React, { useState } from "react";
import "./Styles.Header.css";
import HeaderButton from "../header-button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Navbar">
      <img
        className="nav-logo"
        width={200}
        src={require("../../assets/images/headericon.png")}
      />

      <div className={`nav-items ${isOpen && "open"}`}>
        <HeaderButton
          src={require("../../assets/images/avatar.png")}
          title={"Giriş Yap"}
        />
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Header;
