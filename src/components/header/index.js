import React, { useEffect, useState } from "react";
import HeaderButton from "../header-button";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout } from "../../helpers/firebaseAuth";
import { selectTotalQuantity } from "../../store/selectors";

import "./Styles.Header.css";
import PriceCard from "../price-card";

import { fetchBalance } from "../../store/balance";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const balanceData = useSelector((state) => state.balance.balanceArray);

  const navigate = useNavigate();

  const [avatarButton, setAvatarButton] = useState(false);
  const totalQuantity = useSelector(selectTotalQuantity);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBalance());
  }, [user]);

  const findBalance = balanceData?.find(
    (item) => item.balance.userEmail === user.email
  );

  const userWalletBalance = findBalance ? findBalance.balance.balance : 0;

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
              onClick={() => {
                navigate("/mywallet");
                setIsOpen(false);
              }}
              src={require("../../assets/images/wallet.png")}
              title={
                <>
                  <div className="header-wallet-container">
                    <span>Cüzdanım</span>
                    <PriceCard
                      priceCardStyle={"header-wallet-style"}
                      balance={userWalletBalance}
                    />
                  </div>
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
              basketPlace={!totalQuantity === 0}
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
