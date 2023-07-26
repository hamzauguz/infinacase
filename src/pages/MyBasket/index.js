import React from "react";
import "./Styles.MyBasket.css";
import HeaderButton from "../../components/header-button";

const MyBasket = () => {
  return (
    <div className="mybasket-container">
      <div className="page-header-container">
        <HeaderButton
          src={require("../../assets/images/basket.png")}
          title={"Sepetim"}
        />
      </div>
    </div>
  );
};

export default MyBasket;
