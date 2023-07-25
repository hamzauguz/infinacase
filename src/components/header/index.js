import React, { useState } from "react";
import "./Styles.Header.css";
import HeaderButton from "../header-button";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout } from "../../helpers/firebaseAuth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [avatarButton, setAvatarButton] = useState(false);

  const handleMouseEnter = () => {
    setAvatarButton(true);
  };

  const handleMouseLeave = () => {
    setAvatarButton(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="Navbar">
      <img
        className="nav-logo"
        src={require("../../assets/images/headericon.png")}
      />

      <div className={`nav-items ${isOpen && "open"}`}>
        {user ? (
          <>
            <HeaderButton
              onClick={() => handleLogout()}
              src={require("../../assets/images/avatar.png")}
              title={!avatarButton ? user.fullName : "Çıkış Yap"}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <HeaderButton
              src={require("../../assets/images/wallet.png")}
              title={
                <>
                  <span>Cüzdanım:</span> <span>150tl</span>
                </>
              }
            />
            <HeaderButton
              src={require("../../assets/images/basket.png")}
              title={"Sepetim"}
              basketPlace
              basketCount={2}
            />
          </>
        ) : (
          <HeaderButton
            src={require("../../assets/images/avatar.png")}
            title={"Giriş Yap"}
          />
        )}
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
