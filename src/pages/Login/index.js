import React from "react";
import "./Styles.Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <img src={require("../../assets/images/mobile-login.png")} />
      <div className="login-right-container">
        <span className="login-right-title">
          En uygun fiyatlara ulaşmak <br /> için giriş yapın!
        </span>

        <div className="label-with-input-container">
          <span className="label-lwic">E-mailiniz</span>
          <input className="input-container" />
        </div>
      </div>
    </div>
  );
};

export default Login;
