import React, { useState, useEffect } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import "./Styles.ProductCard.css";

const ProductCard = ({
  productImage,
  productTitle,
  productPrice,
  productQuantity,
  OnIncrementPress,
  OnDecrementPress,
  amount,
  disabledProduct,
}) => {
  const [count, setCount] = useState(amount);

  const [basketIcon, setBasketIcon] = useState(false);

  const handleMouseEnter = () => {
    setBasketIcon(true);
  };

  const handleMouseLeave = () => {
    setBasketIcon(false);
  };

  const handleIncrement = () => {
    setCount(count + 1);
    OnIncrementPress();
  };
  const handleDecrement = () => {
    setCount(count - 1);
    OnDecrementPress();
  };

  return (
    <div className="product-card-container">
      <img className="product-image-style" src={productImage} />
      <div className="product-bottom-container">
        <div className="product-bottom-left-container">
          <span className="bottom-left-product-title">{productTitle}</span>
          <span className="bottom-left-product-price">{productPrice} TL</span>
          <span className="bottom-left-product-count">
            {productQuantity} Adetle Sınırlı
          </span>
        </div>
        <div
          className={`addtocard-container ${
            !count == 0 && "open-increment-basket"
          }`}
        >
          {!count == 0 && (
            <div
              style={{ pointerEvents: disabledProduct ? "auto" : "none" }}
              onClick={() => handleIncrement()}
              className="product-increment-count"
            >
              <AiOutlinePlus color="#C3ECEA" size={35} />
            </div>
          )}
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => (count == 0 ? handleIncrement() : handleDecrement())}
            className="product-addtocard-basket"
          >
            {!count == 0 && (
              <div className="product-basket-count">
                <span className="product-basket-count-style">
                  {count > 9 ? "9+" : count}
                </span>
              </div>
            )}
            {!basketIcon || count == 0 ? (
              <LuShoppingCart size={26} color="#349590" />
            ) : (
              <AiOutlineMinus size={30} color="red" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
