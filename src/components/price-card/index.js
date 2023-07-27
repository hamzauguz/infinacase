import React from "react";
import "./Styles.PriceCard.css";

const PriceCard = ({ balance }) => {
  const formattedBalance = balance.toLocaleString("tr-TR");

  return <div className="price-card-container">{formattedBalance} TL</div>;
};

export default PriceCard;
