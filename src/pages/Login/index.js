import React from "react";
import { useMediaQuery } from "react-responsive";

import "./Styles.Login.css";
import LabelWithInput from "../../components/label-with-input";

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
          <LabelWithInput labelTitle={"E-Mailiniz"} type={"text"} />
          <LabelWithInput labelTitle={"Şifreniz"} type={"password"} />
        </div>
        <span className="login-button">Giriş Yap</span>
      </div>
    </div>
  );
};

export default Login;
