import React, { useEffect, useState } from "react";
import "./Styles.Header.css";
import HeaderButton from "../header-button";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout } from "../../helpers/firebaseAuth";
import { selectTotalQuantity } from "../../store/selectors";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [avatarButton, setAvatarButton] = useState(false);
  const totalQuantity = useSelector(selectTotalQuantity);

  useEffect(() => {
    setAvatarButton(false);
  }, [user]);

  const handleMouseEnter = () => {
    setAvatarButton(true);
  };

  const handleMouseLeave = () => {
    setAvatarButton(false);
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="Navbar">
      <img
        onClick={() => navigate("/")}
        className="nav-logo"
        src={require("../../assets/images/headericon.png")}
      />

      <div className={`nav-items ${isOpen && "open"}`}>
        {user ? (
          <>
            <HeaderButton
              onClick={() => handleLogout()}
              src={require("../../assets/images/avatar.png")}
              title={avatarButton ? "Çıkış Yap" : user?.fullName}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <HeaderButton
              onClick={() => setIsOpen(false)}
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
              onClick={() => {
                setIsOpen(false);
                navigate("/mybasket");
              }}
              basketPlace={!totalQuantity == 0}
              basketCount={totalQuantity}
            />
          </>
        ) : (
          <HeaderButton
            onClick={() => {
              setIsOpen(false);
              navigate("/login");
            }}
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
