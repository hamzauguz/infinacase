import React, { useEffect, useState } from "react";
import HeaderButton from "../../components/header-button";
import BasketProductCard from "../../components/basket-product-card";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clear,
  decrement,
  increment,
  removeItem,
} from "../../store/cartSlice";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { selectTotalPrice } from "../../store/selectors";
import { fetchBalance, updateBalance } from "../../store/balance";
import {
  addConfirmProductToFirestore,
  deleteConfirmProduct,
  fetchConfirmProduct,
} from "../../store/confirmProductSlice";

import "./Styles.MyBasket.css";

const MyBasket = () => {
  const dispatch = useDispatch();

  const [confirmProducts, setConfirmProducts] = useState([]);
  const [userBasketId, setUserBasketId] = useState(null);

  useEffect(() => {
    dispatch(fetchConfirmProduct())
      .then((products) => {
        setUserBasketId(products.payload.id);
        setConfirmProducts(products.payload.basket.basket);
        console.log("products: ", products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  const myBasketProducts = useSelector((state) => state.card.card);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const balanceData = useSelector((state) => state.balance.balanceArray);
  const totalPrice = useSelector(selectTotalPrice);

  const userBalance = balanceData;

  const filteredBasketProducts = myBasketProducts.filter(
    (item) => item.quantity > 0
  );

  const newBalance = userBalance.balance.balance - totalPrice;

  const productAmountState = (amount, item) => {
    if (amount === 0) {
      dispatch(addToCart(item));
    } else {
      dispatch(increment(item.id));
    }
  };

  const removeProduct = (amount, item) => {
    if (amount === 1) {
      Swal.fire({
        title: "Sil",
        text: `Sepetteki ${item.product.title} ürününü silmek istiyor musunuz?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        iconColor: "#84c7c4",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeItem(item.id));
          toast.success(`${item.product.title} ürünü başarıyla silindi`);
        }
      });
    } else if (amount > 1) {
      dispatch(decrement(item.id));
    }
  };

  const addToWallet = async () => {
    let confirmproduct = {
      userEmail: user.email,
      basket: filteredBasketProducts,
    };

    if (totalPrice > userBalance.balance.balance)
      return toast.error("Yetersiz Bakiye!");

    dispatch(updateBalance({ id: userBalance.id, balance: newBalance }));

    if (confirmProducts.length !== 0) {
      dispatch(deleteConfirmProduct(userBasketId));
    }

    dispatch(addConfirmProductToFirestore(confirmproduct)).then(() => {
      toast.success("Sipariş verildi.");
      navigate("/mywallet");
      dispatch(clear());
    });
  };

  return (
    <div className="mybasket-container">
      <div className="page-header-container">
        <HeaderButton
          src={require("../../assets/images/basket.png")}
          title={"Sepetim"}
        />
      </div>
      <div className="mybasket-card-main">
        {filteredBasketProducts.length === 0 ? (
          <div className="no-products-message">
            <img
              className="no-product-image"
              src={require("../../assets/images/emptybasket.png")}
            />
          </div>
        ) : (
          filteredBasketProducts.map((item, key) => {
            const addedItem = myBasketProducts.find(
              (addedItem) => addedItem.id === item.id
            );
            const amount = addedItem ? addedItem.quantity : 0;

            return (
              <BasketProductCard
                key={key}
                productImage={item.product.image}
                productTitle={item.product.title}
                productPrice={item.product.price * amount}
                productQuantity={item.product.quantity}
                amount={amount}
                disabledProduct={amount < item.product.quantity}
                onIncrementClick={() => {
                  productAmountState(amount, item);
                }}
                onDecrementClick={() => {
                  removeProduct(amount, item);
                }}
              />
            );
          })
        )}
        {filteredBasketProducts.length === 0 ? (
          <span onClick={() => navigate("/")} className="confirm-basket-button">
            Alişverişe Devam Et
          </span>
        ) : (
          <span onClick={() => addToWallet()} className="confirm-basket-button">
            Sepeti Onayla
          </span>
        )}
      </div>
    </div>
  );
};

export default MyBasket;
