import React from "react";
import "./Styles.Home.css";
import { useSelector } from "react-redux";
import { logout } from "../../helpers/firebaseAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await logout();
    navigate("/login", {
      replace: true,
    });
  };

  console.log("user::", user);
  return (
    <div>
      home <br />
      {user && (
        <>
          <span>giriş yaptın</span>
          <button onClick={handleLogout}>çıkış yap</button>
          <h1>hoşgeldin {user.fullName}</h1>
        </>
      )}
    </div>
  );
};

export default Home;
