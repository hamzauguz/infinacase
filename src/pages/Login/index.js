import React from "react";
import "./Styles.Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <img src={require("../../assets/images/mobile-login.png")} />
      <div className="login-right-container"></div>
    </div>
  );
};

export default Login;
