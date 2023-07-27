import React, { useEffect, useState } from "react";
import "./Styles.Home.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../helpers/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../store/product";
import { RiSearch2Line } from "react-icons/ri";
import ProductCard from "../../components/product-card";
import { selectTotalPrice, selectTotalQuantity } from "../../store/selectors";
import { addToCart, decrement, increment } from "../../store/cartSlice";
import { toast } from "react-toastify";

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

  console.log("user::", user);

  const productAmountState = (amount, item) => {
    if (amount == 0) {
      dispatch(addToCart(item));
    } else {
      dispatch(increment(item.id));
    }
  };

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
          const addedItem = addedCard.find(
            (addedItem) => addedItem.id === item.id
          );
          const amount = addedItem ? addedItem.quantity : 0;
          return (
            <ProductCard
              key={key}
              productImage={item.product.image}
              productTitle={item.product.title}
              productPrice={item.product.price}
              productQuantity={item.product.quantity}
              amount={amount}
              disabledProduct={amount < item.product.quantity}
              onIncrementClick={() => {
                toast.success("Urun  Eklendi", {
                  position: "top-center",
                });
                productAmountState(amount, item);
              }}
              onDecrementClick={() => {
                toast.success("Urun Çıkartıldı ", {
                  position: "top-center",
                });
                dispatch(decrement(item.id));
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
