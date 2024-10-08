import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import "./Styles.BasketProductCard.css";

const BasketProductCard = ({
  productImage,
  productTitle,
  productPrice,
  productQuantity,
  amount,
  onIncrementClick,
  onDecrementClick,
  disabledProduct,
  mybasketCardStyle,
  mybasketCardPriceStyle,
}) => {
  return (
    <div className={`mybasket-card-container ${mybasketCardStyle}`}>
      <div className="mybasket-left-card-container">
        <img className="mybasket-card-image" src={productImage} />
        <div className="mybasket-left-title-card-container">
          <span className="mybasket-card-title">{productTitle}</span>
          <span className="mybasket-card-amount">
            Limited to {productQuantity} pieces
          </span>
        </div>
      </div>
      <div className="mybasket-right-card-container ">
        <div className="addtocard-container open-increment-basket mybasket-style">
          <div
            onClick={() => onDecrementClick()}
            className="product-increment-count mybasket-count-button"
          >
            <AiOutlineMinus size={35} color="#C3ECEA" />
          </div>

          <div>
            <span className="mybasket-amount-count">{amount}</span>
          </div>

          <div
            style={{ pointerEvents: disabledProduct ? "auto" : "none" }}
            onClick={() => onIncrementClick()}
            className="product-increment-count mybasket-right-padding mybasket-count-button"
          >
            <AiOutlinePlus color="#C3ECEA" size={35} />
          </div>
        </div>

        <span className={`mybasket-card-price ${mybasketCardPriceStyle}`}>
          {productPrice} $
        </span>
      </div>
    </div>
  );
};

export default BasketProductCard;
