import React from "react";
import HeaderButton from "../../components/header-button";
import BasketProductCard from "../../components/basket-product-card";

import "./Styles.MyBasket.css";

const MyBasket = () => {
  return (
    <div className="mybasket-container">
      <div className="page-header-container">
        <HeaderButton
          src={require("../../assets/images/basket.png")}
          title={"Sepetim"}
        />
      </div>
      <div className="mybasket-card-main">
        <BasketProductCard />
        <span className="confirm-basket-button">Sepeti Onayla</span>
      </div>
    </div>
  );
};

export default MyBasket;
