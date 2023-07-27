import React from "react";
import HeaderButton from "../../components/header-button";
import BasketProductCard from "../../components/basket-product-card";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrement,
  increment,
  removeItem,
} from "../../store/cartSlice";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

import "./Styles.MyBasket.css";

const MyBasket = () => {
  const myBasketProducts = useSelector((state) => state.card.card);
  const dispatch = useDispatch();
  console.log("added card :  ", myBasketProducts);

  const productAmountState = (amount, item) => {
    if (amount == 0) {
      dispatch(addToCart(item));
    } else {
      dispatch(increment(item.id));
    }
  };

  const removeProduct = (amount, item) => {
    if (amount == 1) {
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          return;
        }
      });
    } else if (amount > 1) {
      dispatch(decrement(item.id));
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
        {myBasketProducts.map((item, key) => {
          const addedItem = myBasketProducts.find(
            (addedItem) => addedItem.id === item.id
          );
          const amount = addedItem ? addedItem.quantity : 0;

          return (
            <BasketProductCard
              key={key}
              productImage={item.product.image}
              productTitle={item.product.title}
              productPrice={item.product.price}
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
        })}

        <span className="confirm-basket-button">Sepeti Onayla</span>
      </div>
    </div>
  );
};

export default MyBasket;
