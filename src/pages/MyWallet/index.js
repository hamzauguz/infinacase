import React, { useEffect, useState } from "react";
import HeaderButton from "../../components/header-button";
import BasketProductCard from "../../components/basket-product-card";
import PriceCard from "../../components/price-card";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfirmProduct } from "../../store/confirmProductSlice";
import { filterItem } from "../../helpers/filterItem";
import LineBarChart from "../../components/line-bar-chart";
import { getproductPricesByCategory } from "../../helpers/chart-helpers";

import "./Styles.MyWallet.css";

const MyWallet = () => {
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

  return (
    <div>
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
                    disabledProduct={true}
                    disabledDecrement={true}
                  />
                );
              })}
          </div>
          <div className="mywallet-balance-main">
            <span className="my-wallet-product-title">Bakiye Bilgileri</span>
            <div className="mywallet-balance-container">
              <div className="mywallet-balance-item-container">
                <span className="mw-balance-item-title">Toplam bakiyeniz:</span>
                <PriceCard balance={beforeBalance} />
              </div>
              <div className="mywallet-balance-item-container">
                <span className="mw-balance-item-title">
                  Toplam sepet tutarınız:
                </span>
                <PriceCard balance={totalProductPrice} />
              </div>
              <div className="mywallet-balance-item-container">
                <span className="mw-balance-item-title">Kalan bakiyeniz:</span>
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
              <span className="mw-balance-item-title">Toplam harcamanız:</span>
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
        <span className="confirm-basket-button">Sepeti Onayla</span>
      </div>
    </div>
  );
};

export default MyWallet;
