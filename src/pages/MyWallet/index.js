import React from "react";
import "./Styles.MyWallet.css";
import HeaderButton from "../../components/header-button";
import BasketProductCard from "../../components/basket-product-card";
import PriceCard from "../../components/price-card";

const MyWallet = () => {
  return (
    <div>
      <div className="page-header-container mywallet-page-header">
        <div className="mywallet-nav-title">
          <HeaderButton
            headerButtonStyle={"mywallet-header-button"}
            src={require("../../assets/images/wallet.png")}
            title={"Cüzdanım"}
          />
          <PriceCard balance={500} />
        </div>
      </div>
      <div className="my-wallet-container">
        <div className="basket-balance-container">
          <div className="my-wallet-product-main">
            <span className="my-wallet-product-title">
              Sepetinizdeki Ürünler (Amount)
            </span>
            <BasketProductCard
              mybasketCardStyle={"mywallet-product-card"}
              mybasketCardPriceStyle={"mywallet-product-price"}
              productImage={require("../../assets/images/wallet.png")}
              productTitle={"kulaklık adasd"}
              productPrice={140}
              productQuantity={5}
              amount={2}
              // disabledProduct={amount < item.product.quantity}
              // // disabledDecrement={!amount == 0}
              // onIncrementClick={() => {
              //   productAmountState(amount, item);
              // }}
              // onDecrementClick={() => {
              //   removeProduct(amount, item);
              // }}
            />
          </div>
          <div className="mywallet-balance-main">
            <span className="my-wallet-product-title">Bakiye Bilgileri</span>
            <div className="mywallet-balance-container">
              <div className="mywallet-balance-item-container">
                <span className="mw-balance-item-title">Toplam bakiyeniz:</span>
                <PriceCard balance={500} />
              </div>
              <div className="mywallet-balance-item-container">
                <span className="mw-balance-item-title">
                  Toplam sepet tutarınız:
                </span>
                <PriceCard balance={500} />
              </div>
              <div className="mywallet-balance-item-container">
                <span className="mw-balance-item-title">Kalan bakiyeniz:</span>
                <PriceCard balance={500} />
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
                Toplam sepet tutarınız:
              </span>
              <PriceCard priceCardStyle={"expenses-inside"} balance={500} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
