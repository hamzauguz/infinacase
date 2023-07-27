import React from "react";
import "./Styles.PriceCard.css";

const PriceCard = ({ totalPrice = 30000 }) => {
  return <div className="price-card-container">{totalPrice} TL</div>;
};

export default PriceCard;
