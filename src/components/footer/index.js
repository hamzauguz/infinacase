import React from "react";
import "./Styles.Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <img
        className="footer-icon"
        src={require("../../assets/images/footericon.png")}
      />
      <span className="footer-title">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit
        malesuada dapibus ut pulvinar neque arcu, commodo. Pharetra nisi egestas
        nisi fermentum. Sollicitudin egestas senectus pellentesque enim mauris
        vel odio commodo. Pellentesque orci vestibulum sed in molestie
        consequat.
      </span>
    </div>
  );
};

export default Footer;
