import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import "./Styles.Login.css";
import LabelWithInput from "../../components/label-with-input";

const Login = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log("email: ", formData.email, formData.password);

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
          <LabelWithInput
            name={"email"}
            value={formData.email}
            onChange={handleInputChange}
            labelTitle={"E-Mailiniz"}
            type={"text"}
          />
          <LabelWithInput
            name={"password"}
            value={formData.password}
            onChange={handleInputChange}
            labelTitle={"Şifreniz"}
            type={"password"}
          />
        </div>
        <div>
          <span className="login-register-button">Giriş Yap</span>
          <span
            onClick={() => navigate("/register")}
            className="login-register-button"
          >
            Kayıt Ol
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
