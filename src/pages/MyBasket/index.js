import React, { useEffect } from "react";
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
import { getUserCollection } from "../../helpers/firebaseAuth";
import { addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectTotalPrice } from "../../store/selectors";

import "./Styles.MyBasket.css";
import { fetchBalance, updateBalance } from "../../store/balance";

const MyBasket = () => {
  const myBasketProducts = useSelector((state) => state.card.card);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const balanceData = useSelector((state) => state.balance.balanceArray);
  const totalPrice = useSelector(selectTotalPrice);

  const findBalance = balanceData.find(
    (item) => item.balance.userEmail === user.email
  );

  const userWalletBalance = findBalance ? findBalance.balance.balance : 0;

  const filteredBasketProducts = myBasketProducts.filter(
    (item) => item.quantity > 0
  );

  const newBalance = userWalletBalance - totalPrice;

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

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
  const confirmProducts = useSelector(
    (state) => state.confirmProduct.productsArray
  );

  const findConfirmProduct = confirmProducts?.find(
    (item) => item.basket.userEmail === user.email
  );

  console.log("findConfirmProduct: ", findConfirmProduct);

  const isBasketNotEmpty = !!findConfirmProduct;

  console.log("isBasketNotEmpty: ", isBasketNotEmpty);

  console.log("totalPrice: ", totalPrice);
  const addToWallet = async () => {
    if (totalPrice > userWalletBalance) return toast.error("Yetersiz Bakiye!");
    const userBasketRef = getUserCollection(db, "userbasket");
    if (!isBasketNotEmpty) {
      await addDoc(userBasketRef, {
        userEmail: user.email,
        basket: filteredBasketProducts,
      }).then(() => {
        dispatch(updateBalance({ id: findBalance.id, balance: newBalance }));

        dispatch(clear());
        navigate("/mywallet");
        toast.success("Sipariş verildi.");
      });
    } else {
    }
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
                // disabledDecrement={!amount == 0}
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
