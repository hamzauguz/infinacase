import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product";
import ProductCard from "../../components/product-card";

import { addToCart, decrement, increment } from "../../store/cartSlice";
import { toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import { RiSearch2Line } from "react-icons/ri";
import debounce from "lodash.debounce";
import { filterItem } from "../../helpers/filterItem";

import "./Styles.Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.productsArray);
  const addedCard = useSelector((state) => state.card.card);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const fetchProductsAndSetLoading = async () => {
      try {
        await dispatch(fetchProducts());
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProductsAndSetLoading();
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const productAmountState = (amount, item) => {
    if (user) {
      toast.success("Product Added", {
        position: "top-center",
      });
      if (amount === 0) {
        dispatch(addToCart(item));
      } else {
        dispatch(increment(item.id));
      }
    } else {
      toast.warning("You need to log in to add products.", {
        position: "top-center",
      });
      navigate("/login");
    }
  };

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setFilteredProducts(products);
    } else {
      setSelectedCategory(categoryName);

      const filtered = products.filter(
        (item) => item.product.category == categoryName
      );
      setFilteredProducts(filtered);
    }
  };

  const debouncedSearch = debounce((value) => {
    const lowerCaseValue = value.toLowerCase();
    const filtered = products.filter((item) => {
      const categoryCheck =
        !selectedCategory || item.product.category == selectedCategory;
      const searchCheck =
        !value || item.product.title.toLowerCase().includes(lowerCaseValue);
      return categoryCheck && searchCheck;
    });
    setFilteredProducts(filtered);
  }, 500);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <div>
      <div className="search-filter-container">
        <div className="input-with-icon-container">
          <RiSearch2Line size={32} className="input-search-icon" />
          <input
            onChange={handleSearch}
            placeholder="What are you looking for?"
            className="search-input"
          />
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
          {filteredProducts.length === 0 ? (
            <h1>No products found.</h1>
          ) : (
            <>
              {filteredProducts.map((item, key) => {
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
                      productAmountState(amount, item);
                    }}
                    onDecrementClick={() => {
                      toast.success("Product Removed", {
                        position: "top-center",
                      });
                      dispatch(decrement(item.id));
                    }}
                  />
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
