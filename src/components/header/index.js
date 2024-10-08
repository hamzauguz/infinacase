import React, { useEffect, useState } from "react";
import HeaderButton from "../header-button";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout } from "../../helpers/firebaseAuth";
import { selectTotalQuantity } from "../../store/selectors";
import PriceCard from "../price-card";
import { fetchBalance } from "../../store/balance";

import "./Styles.Header.css";
import { toast } from "react-toastify";

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
    toast.success("Logged out successfully.");
    await logout();
    navigate("/login", {
      replace: true,
    });
  };
  const findBalance = balanceData?.find(
    (item) => item.balance.userEmail === user.email
  );

  const userBalance = findBalance ? findBalance.balance.balance : 0;

  return (
    <div className="Navbar">
      <img
        onClick={() => navigate("/")}
        className="nav-logo"
        src={require("../../assets/images/headericon.png")}
      />

      <div style={{ zIndex: 1 }} className={`nav-items ${isOpen && "open"}`}>
        {user ? (
          <>
            <HeaderButton
              onClick={() => handleLogout()}
              src={require("../../assets/images/avatar.png")}
              title={avatarButton ? "Log Out" : user?.fullName}
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
                    <span>My Wallet</span>
                    <PriceCard
                      priceCardStyle={"header-wallet-style"}
                      balance={userBalance}
                    />
                  </div>
                </>
              }
            />
            <HeaderButton
              src={require("../../assets/images/basket.png")}
              title={"My Basket"}
              onClick={() => {
                setIsOpen(false);
                navigate("/mybasket");
              }}
              basketPlace={totalQuantity != 0}
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
            title={"Log In"}
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
