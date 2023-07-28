import React, { useEffect } from "react";
import "./Styles.MyWallet.css";
import HeaderButton from "../../components/header-button";
import BasketProductCard from "../../components/basket-product-card";
import PriceCard from "../../components/price-card";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../../store/balance";
import { fetchConfirmProduct } from "../../store/confirmProductSlice";

const MyWallet = () => {
  const dispatch = useDispatch();

  const balanceData = useSelector((state) => state.balance.balanceArray);
  const { user } = useSelector((state) => state.auth);
  const confirmProducts = useSelector(
    (state) => state.confirmProduct.productsArray
  );
  const findBalance = balanceData.find(
    (item) => item.balance.userEmail === user.email
  );
  console.log("findBalance: ", findBalance.balance.balance);

  const findConfirmProduct = confirmProducts?.find(
    (item) => item.basket.userEmail === user.email
  );

  const basketItems = findConfirmProduct?.basket?.basket ?? [];

  const totalProductPrice = basketItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );
  const totalQuantity = basketItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const beforeBalance = findBalance.balance.balance + totalProductPrice;

  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchConfirmProduct());
  }, []);

  return (
    <div>
      <div className="page-header-container mywallet-page-header">
        <div className="mywallet-nav-title">
          <HeaderButton
            headerButtonStyle={"mywallet-header-button"}
            src={require("../../assets/images/wallet.png")}
            title={"Cüzdanım"}
          />
          <PriceCard balance={findBalance.balance.balance} />
        </div>
      </div>
      <div className="my-wallet-container">
        <div className="basket-balance-container">
          <div className="my-wallet-product-main">
            <span className="my-wallet-product-title">
              Sepetinizdeki Ürünler ({totalQuantity})
            </span>
            {findConfirmProduct &&
              findConfirmProduct?.basket.basket.map((item, key) => {
                return (
                  <BasketProductCard
                    key={key}
                    mybasketCardStyle={"mywallet-product-card"}
                    mybasketCardPriceStyle={"mywallet-product-price"}
                    productImage={item.product.image}
                    productTitle={item.product.title}
                    productPrice={item.product.price}
                    productQuantity={item.product.quantity}
                    amount={item.quantity}
                    // disabledProduct={amount < item.product.quantity}
                    // // disabledDecrement={!amount == 0}
                    // onIncrementClick={() => {
                    //   productAmountState(amount, item);
                    // }}
                    // onDecrementClick={() => {
                    //   removeProduct(amount, item);
                    // }}
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
                <PriceCard balance={findBalance.balance.balance} />
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
              <PriceCard
                priceCardStyle={"expenses-inside"}
                balance={totalProductPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
