import React, { useEffect } from "react";
import "./Styles.Home.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../helpers/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../store/product";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const data = useSelector((state) => state.product.productsArray);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogout = async () => {
    await logout();
    navigate("/login", {
      replace: true,
    });
  };

  console.log("user::", user);
  console.log("products Data::", data);
  return (
    <div>
      {/* home <br />
      {user && (
        <>
          <span>giriş yaptın</span>
          <button onClick={handleLogout}>çıkış yap</button>
          <h1>hoşgeldin {user.fullName}</h1>
        </>
      )} */}
      <div className="search-filter-container">search filter</div>
    </div>
  );
};

export default Home;
