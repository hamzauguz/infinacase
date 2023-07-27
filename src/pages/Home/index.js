import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../store/product";

import ProductCard from "../../components/product-card";
import { selectTotalPrice, selectTotalQuantity } from "../../store/selectors";
import { addToCart, decrement, increment } from "../../store/cartSlice";
import { toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import { RiSearch2Line } from "react-icons/ri";

import "./Styles.Home.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.product.productsArray);
  const addedCard = useSelector((state) => state.card.card);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsAndSetLoading = async () => {
      try {
        await dispatch(fetchProducts());
        setLoading(false);
      } catch (error) {
        console.error("Ürünler alınırken bir hata oluştu:", error);
        setLoading(false);
      }
    };

    fetchProductsAndSetLoading();
  }, [dispatch]);

  const productAmountState = (amount, item) => {
    if (amount == 0) {
      dispatch(addToCart(item));
    } else {
      dispatch(increment(item.id));
    }
  };

  const [selectedCategory, setSelectedCategory] = useState(null); // State for the selected category
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  console.log("category name: ", selectedCategory);

  const filterItem = [
    {
      categoryName: "Teknoloji",
    },
    {
      categoryName: "Giyim",
    },
    {
      categoryName: "Kozmetik",
    },
    {
      categoryName: "Mobilya",
    },
    {
      categoryName: "Aksesuar",
    },
  ];

  return (
    <div>
      <div className="search-filter-container">
        <div className="input-with-icon-container">
          <RiSearch2Line size={32} className="input-search-icon" />
          <input placeholder="Ne alsan?" className="search-input" />
        </div>
        <div className="filter-button-container">
          {filterItem.map((item, key) => {
            return (
              <span
                key={key}
                className={`filter-button ${
                  selectedCategory === item.categoryName ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(item.categoryName)}
              >
                {item.categoryName}
              </span>
            );
          })}
        </div>
      </div>
      {loading ? (
        <div className="loading-message">
          <ThreeCircles
            height="100"
            width="100"
            color="#84c7c4"
            visible={true}
          />
        </div>
      ) : (
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
                  toast.success("Ürün Eklendi", {
                    position: "top-center",
                  });
                  productAmountState(amount, item);
                }}
                onDecrementClick={() => {
                  toast.success("Ürün Çıkartıldı ", {
                    position: "top-center",
                  });
                  dispatch(decrement(item.id));
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
