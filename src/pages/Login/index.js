import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import LabelWithInput from "../../components/label-with-input";
import { login } from "../../helpers/firebaseAuth";
import { toast } from "react-toastify";

import "./Styles.Login.css";

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

  const handleLogin = async () => {
    const user = await login(formData.email, formData.password);
    if (user) {
      toast.success("Login successful.");
      navigate("/", {
        replace: true,
      });
    }
  };

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
          Log in to access the best prices! <br />
        </span>
        <div className="login-input-container">
          <LabelWithInput
            name={"email"}
            value={formData.email}
            onChange={handleInputChange}
            labelTitle={"Your Email"}
            type={"text"}
          />
          <LabelWithInput
            name={"password"}
            value={formData.password}
            onChange={handleInputChange}
            labelTitle={"Your Password"}
            type={"password"}
          />
        </div>
        <div>
          <span onClick={() => handleLogin()} className="login-register-button">
            Log In
          </span>
          <span
            onClick={() => navigate("/register")}
            className="login-register-button"
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
