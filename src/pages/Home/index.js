import React, { useEffect, useState } from "react";
import "./Styles.Home.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../helpers/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../store/product";
import { RiSearch2Line } from "react-icons/ri";
import ProductCard from "../../components/product-card";
import { selectTotalPrice, selectTotalQuantity } from "../../store/selectors";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.product.productsArray);
  const addedCard = useSelector((state) => state.card.card);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

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
  console.log("products Data::", productData);
  const [count, setCount] = useState(0);

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
      {/* <div className="search-filter-container">
        <div className="input-with-icon-container">
          <RiSearch2Line size={32} className="input-search-icon" />
          <input placeholder="Ne alsan?" className="search-input" />
        </div>
        <div className="filter-button-container">
          <span className="filter-button">Teknoloji</span>
          <span className="filter-button">Giyim</span>
          <span className="filter-button">Kozmetik</span>
          <span className="filter-button">Mobilya</span>
          <span className="filter-button">Aksesuar</span>
        </div>
      </div> */}
      <div className="products-container">
        {products.map((item, key) => {
          return (
            <ProductCard
              key={key}
              productImage={item.product.image}
              productTitle={item.product.title}
              productPrice={item.product.price}
              productQuantity={item.product.quantity}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
