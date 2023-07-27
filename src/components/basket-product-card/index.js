import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import "./Styles.BasketProductCard.css";

const BasketProductCard = ({
  productImage,
  productTitle,
  productPrice,
  productQuantity,
  amount,
}) => {
  const [count, setCount] = useState(amount);

  return (
    <div className="mybasket-card-container">
      <div className="mybasket-left-card-container">
        <img className="mybasket-card-image" src={productImage} />
        <div className="mybasket-left-title-card-container">
          <span className="mybasket-card-title">{productTitle}</span>
          <span className="mybasket-card-amount">
            {productQuantity} Adetle Sınırlı
          </span>
        </div>
      </div>
      <div className="mybasket-right-card-container ">
        <div className="addtocard-container open-increment-basket mybasket-style">
          <div className="product-increment-count mybasket-count-button">
            <AiOutlineMinus size={35} color="#C3ECEA" />
          </div>

          <div>
            <span className="mybasket-amount-count">{count}</span>
          </div>

          <div className="product-increment-count mybasket-right-padding mybasket-count-button">
            <AiOutlinePlus color="#C3ECEA" size={35} />
          </div>
        </div>

        <span className="mybasket-card-price">{productPrice} TL</span>
      </div>
    </div>
  );
};

export default BasketProductCard;
