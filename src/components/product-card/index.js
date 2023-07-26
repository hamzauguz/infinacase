import React, { useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import "./Styles.ProductCard.css";

const ProductCard = ({
  productTitle,
  productPrice,
  productQuantity,
  count,
  setCount,
}) => {
  // const [count, setCount] = useState(0);

  const [basketIcon, setBasketIcon] = useState(false);

  const handleMouseEnter = () => {
    setBasketIcon(true);
  };

  const handleMouseLeave = () => {
    setBasketIcon(false);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };

  return <div>product card</div>;
};

export default ProductCard;
