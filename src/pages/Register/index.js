import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import LabelWithInput from "../../components/label-with-input";
import { register } from "../../helpers/firebaseAuth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import "./Styles.Register.css";

const Register = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    displayName: "",
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

  useEffect(() => {
    if (user) return navigate("/");
  }, [user]);

  const handleRegister = async () => {
    await register(
      formData.email,
      formData.password,
      formData.displayName
    ).catch(() => {
      toast.error("Error");
    });
  };

  return (
    <div className="login-container">
      <div className="login-right-container register-right-container">
        <span className="login-right-title">
          Sign up to access the best prices!
        </span>
        <div className="register-input-container">
          <LabelWithInput
            name={"displayName"}
            value={formData.displayName}
            onChange={handleInputChange}
            labelTitle={"Your Name and Surname"}
            type={"text"}
          />
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
          <span
            onClick={() => handleRegister()}
            className="login-register-button"
          >
            Sign Up
          </span>
          <span
            onClick={() => navigate("/login")}
            className="login-register-button"
          >
            Log In
          </span>
        </div>
      </div>
      {!isMobile && (
        <img
          className="login-image"
          src={require("../../assets/images/mobile-login.png")}
        />
      )}
    </div>
  );
};

export default Register;
