import React, { useEffect, useState } from "react";
import HeaderButton from "../../components/header-button";
import BasketProductCard from "../../components/basket-product-card";
import PriceCard from "../../components/price-card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConfirmProduct,
  updateConfirmProduct,
} from "../../store/confirmProductSlice";
import { filterItem } from "../../helpers/filterItem";
import LineBarChart from "../../components/line-bar-chart";
import { getproductPricesByCategory } from "../../helpers/chart-helpers";

import "./Styles.MyWallet.css";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyWallet = () => {
  const dispatch = useDispatch();
  const [confirmProducts, setConfirmProducts] = useState([]);
  const [userBasketId, setUserBasketId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchConfirmProduct())
      .then((products) => {
        setUserBasketId(products.payload.id);
        setConfirmProducts(products.payload.basket.basket);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(true);
      });
  }, []);

  const balanceData = useSelector((state) => state.balance.balanceArray);

  const userBalance = balanceData.balance.balance;

  const totalProductPrice = confirmProducts.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );
  const totalQuantity = confirmProducts.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const beforeBalance = userBalance + totalProductPrice;
  const categoryNames = filterItem.map((item) => item.categoryName);
  const productPrices = getproductPricesByCategory(
    categoryNames,
    confirmProducts
  );

  const labels = ["Teknoloji", "Giyim", "Kozmetik", "Mobilya", "Aksesuar"];

  const handleIncrementClick = (index) => {
    const updatedProducts = confirmProducts.map((product, i) =>
      i === index ? { ...product, quantity: product.quantity + 1 } : product
    );
    setConfirmProducts(updatedProducts);
  };

  const handleDecrementClick = (productItem) => {
    if (productItem.quantity > 1) {
      const updatedProducts = confirmProducts.map((product, i) => {
        if (productItem.id === product.id) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setConfirmProducts(updatedProducts);
    } else {
      Swal.fire({
        title: "Sil",
        text: `Sepetteki ürününü silmek istiyor musunuz?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        iconColor: "#84c7c4",
      }).then((result) => {
        if (result.isConfirmed) {
          const deletedProduct = confirmProducts.filter(
            (product) => product.id !== productItem.id
          );

          setConfirmProducts(deletedProduct);
        }
      });
    }
  };

  const handleConfirmBasket = async (id) => {
    toast.loading("Sepetteki ürünleriniz güncelleniyor...");
    await dispatch(updateConfirmProduct({ id, basket: confirmProducts })).then(
      () => {
        toast.dismiss();
        toast.success("Sepetteki ürünleriniz güncellendi.");
      }
    );
  };

  return (
    <div>
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
        <>
          <div className="page-header-container mywallet-page-header">
            <div className="mywallet-nav-title">
              <HeaderButton
                headerButtonStyle={"mywallet-header-button"}
                src={require("../../assets/images/wallet.png")}
                title={"Cüzdanım"}
              />
              <PriceCard balance={userBalance} />
            </div>
          </div>
          <div className="my-wallet-container">
            <div className="basket-balance-container">
              <div className="my-wallet-product-main">
                <span className="my-wallet-product-title">
                  Sepetinizdeki Ürünler ({totalQuantity})
                </span>
                {confirmProducts &&
                  confirmProducts?.map((item, key) => {
                    return (
                      <BasketProductCard
                        key={key}
                        mybasketCardStyle={"mywallet-product-card"}
                        mybasketCardPriceStyle={"mywallet-product-price"}
                        productImage={item.product.image}
                        productTitle={item.product.title}
                        productPrice={item.product.price.toFixed(2)}
                        productQuantity={item.product.quantity}
                        amount={item.quantity}
                        disabledProduct={item.quantity < item.product.quantity}
                        disabledDecrement={true}
                        onIncrementClick={() => handleIncrementClick(key)}
                        onDecrementClick={() => handleDecrementClick(item)}
                      />
                    );
                  })}
              </div>
              <div className="mywallet-balance-main">
                <span className="my-wallet-product-title">
                  Bakiye Bilgileri
                </span>
                <div className="mywallet-balance-container">
                  <div className="mywallet-balance-item-container">
                    <span className="mw-balance-item-title">
                      Toplam bakiyeniz:
                    </span>
                    <PriceCard balance={beforeBalance} />
                  </div>
                  <div className="mywallet-balance-item-container">
                    <span className="mw-balance-item-title">
                      Toplam sepet tutarınız:
                    </span>
                    <PriceCard balance={totalProductPrice} />
                  </div>
                  <div className="mywallet-balance-item-container">
                    <span className="mw-balance-item-title">
                      Kalan bakiyeniz:
                    </span>
                    <PriceCard balance={userBalance} />
                  </div>
                </div>
              </div>
            </div>
            <div className="my-wallet-bottom-container">
              <div className="expenses-container">
                <span className="my-wallet-product-title">
                  Harcamalarınızın Dağılımı
                </span>
                <div className="expenses-price">
                  <span className="mw-balance-item-title">
                    Toplam harcamanız:
                  </span>
                  <PriceCard
                    priceCardStyle={"expenses-inside"}
                    balance={totalProductPrice}
                  />
                </div>
              </div>
              <div className="chart-container">
                <LineBarChart productPrices={productPrices} labels={labels} />
              </div>
            </div>
            <span
              onClick={() => handleConfirmBasket(userBasketId)}
              className="confirm-basket-button"
            >
              Sepeti Onayla
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default MyWallet;
