import React from "react";
import "./Styles.PriceCard.css";

const PriceCard = ({ balance, priceCardStyle }) => {
  const formattedBalance = balance.toLocaleString("tr-TR");

  return (
    <div className={`price-card-container ${priceCardStyle}`}>{balance} TL</div>
  );
};

export default PriceCard;
