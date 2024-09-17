import React from "react";
import "./Styles.PriceCard.css";

const PriceCard = ({ balance, priceCardStyle }) => {
  const formattedBalance = balance
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div className={`price-card-container ${priceCardStyle}`}>
      {formattedBalance} $
    </div>
  );
};

export default PriceCard;
