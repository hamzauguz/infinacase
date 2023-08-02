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
import { getUserCollection } from "../../helpers/firebaseAuth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectTotalPrice } from "../../store/selectors";

import { fetchBalance, updateBalance } from "../../store/balance";
import { fetchConfirmProduct } from "../../store/confirmProductSlice";

import "./Styles.MyBasket.css";

const MyBasket = () => {
  const dispatch = useDispatch();

  const [confirmProducts, setConfirmProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchConfirmProduct())
      .then((products) => {
        setConfirmProducts(products.payload.basket.basket);
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

  const isBasketNotEmpty = !!confirmProducts;

  const addToWallet = async () => {
    if (totalPrice > userBalance.balance.balance)
      return toast.error("Yetersiz Bakiye!");
    const userBasketRef = getUserCollection(db, "userbasket");
    if (!isBasketNotEmpty) {
      await addDoc(userBasketRef, {
        userEmail: user.email,
        basket: filteredBasketProducts,
      }).then(() => {
        dispatch(updateBalance({ id: userBalance.id, balance: newBalance }));

        dispatch(clear());
        navigate("/mywallet");
        toast.success("Sipariş verildi.");
      });
    } else {
      const querySnapshot = await getDocs(collection(db, "userbasket"));
      const userBasketDocs = querySnapshot.docs.filter(
        (doc) => doc.data().userEmail === user.email
      );

      if (userBasketDocs.length > 0) {
        const docRefToDelete = doc(db, "userbasket", userBasketDocs[0].id);
        await deleteDoc(docRefToDelete);
      }

      await addDoc(userBasketRef, {
        userEmail: user.email,
        basket: filteredBasketProducts,
      }).then(() => {
        dispatch(updateBalance({ id: userBalance.id, balance: newBalance }));

        dispatch(clear());
        navigate("/mywallet");
        toast.success(
          "Eski siparişlerinin kaldırılıp yeni siparişleriniz eklendi."
        );
      });
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
