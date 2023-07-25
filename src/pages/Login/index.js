import React from "react";
import "./Styles.Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <img
        className="login-image"
        src={require("../../assets/images/mobile-login.png")}
      />
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
