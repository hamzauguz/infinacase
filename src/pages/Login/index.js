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
      </div>
    </div>
  );
};

export default Login;
