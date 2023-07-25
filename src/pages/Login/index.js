import React from "react";
import { useMediaQuery } from "react-responsive";

import "./Styles.Login.css";

const Login = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  return (
    <div className="login-container">
      {!isMobile && (
        <img
          className="login-image"
          src={require("../../assets/images/mobile-login.png")}
        />
      )}

      <div className="login-right-container">
        <span className="login-right-title">
          En uygun fiyatlara ulaşmak <br /> için giriş yapın!
        </span>
        <div className="login-input-container">
          <div className="label-with-input-container">
            <span className="label-lwic">E-mailiniz</span>
            <input className="input-style" />
          </div>
          <div className="label-with-input-container">
            <span className="label-lwic">Şifreniz</span>
            <input className="input-style" />
          </div>
        </div>
        <span className="login-button">Giriş Yap</span>
      </div>
    </div>
  );
};

export default Login;
