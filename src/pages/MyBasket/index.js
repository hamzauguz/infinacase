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

import "./Styles.MyBasket.css";
import { useNavigate } from "react-router-dom";
import {
  getUserBasketData,
  getUserCollection,
  getUserData,
} from "../../helpers/firebaseAuth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectTotalPrice } from "../../store/selectors";

const MyBasket = () => {
  const myBasketProducts = useSelector((state) => state.card.card);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [userBasketData, setUserBasketData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const filteredBasketProducts = myBasketProducts.filter(
    (item) => item.quantity > 0
  );

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
        }
      });
    } else if (amount > 1) {
      dispatch(decrement(item.id));
    }
  };

  useEffect(() => {
    getUserBasketData(user.email, "userbasket")
      .then((data) => {
        setUserBasketData(data);
      })
      .catch((error) => {
        console.log("Hata oluştu basket: ", error);
      });
  }, []);

  const filteredUserBasket = userBasketData.filter(
    (item) => item.userEmail === user.email
  );

  console.log("filteredUserBasket: ", filteredUserBasket.length !== 0);
  const [userWalletBalance, setUserWalletBalance] = useState();

  useEffect(() => {
    getUserData(user.email, "userwallet")
      .then((data) => {
        setUserWalletBalance(data, "userwallet");
      })
      .catch((error) => {
        console.log("Hata oluştu: ", error);
      });
  }, []);

  console.log("userWalletBalance: ", userWalletBalance);

  const totalPrice = useSelector(selectTotalPrice);

  const newBalance = userWalletBalance - totalPrice;

  const updateBalance = async () => {
    const userRef = query(
      collection(db, "userwallet"),
      where("userEmail", "==", user.email)
    );
    const findUsers = await getDocs(userRef);
    findUsers.forEach(async (user) => {
      const getUser = doc(db, "userwallet", user.id);
      await updateDoc(getUser, {
        balance: newBalance,
      });
    });
  };

  const deleteDocument = async (collectionName, documentId) => {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
      console.log("Belge başarıyla silindi.");
    } catch (error) {
      console.error("Belge silme işlemi başarısız oldu: ", error);
    }
  };

  console.log("totalPrice: ", totalPrice);
  const addToWallet = async () => {
    deleteDocument(db, "userbasket", user.id);
    const userBasketRef = getUserCollection(db, "userbasket");
    await addDoc(userBasketRef, {
      userEmail: user.email,
      basket: filteredBasketProducts,
    }).then(() => {
      dispatch(clear());
      navigate("/mywallet");
      toast.success("Sipariş verildi.");
      updateBalance();
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
