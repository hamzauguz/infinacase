import React, { useEffect, useState } from "react";
import "./Styles.MyWallet.css";
import HeaderButton from "../../components/header-button";
import BasketProductCard from "../../components/basket-product-card";
import PriceCard from "../../components/price-card";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../../store/balance";
import { fetchConfirmProduct } from "../../store/confirmProductSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { filterItem } from "../../helpers/filterItem";
import { chartData } from "../../helpers/chartData";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const userWalletBalance = findBalance ? findBalance.balance.balance : 0;

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
  const beforeBalance = userWalletBalance + totalProductPrice;

  const categoryNames = filterItem.map((item) => item.categoryName);

  const getproductPricesByCategory = () => {
    const productPrices = Array(categoryNames.length).fill(0);
    basketItems.forEach((item) => {
      const categoryIndex = categoryNames.indexOf(item.product.category);
      if (categoryIndex !== -1) {
        productPrices[categoryIndex] += item.quantity * item.product.price;
      }
    });
    return productPrices;
  };

  const productPrices = getproductPricesByCategory();

  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchConfirmProduct());
  }, []);

  const [basketQuantities, setBasketQuantities] = useState(
    basketItems.map((item) => ({ id: item.id, quantity: item.quantity }))
  );

  return (
    <div>
      <div className="page-header-container mywallet-page-header">
        <div className="mywallet-nav-title">
          <HeaderButton
            headerButtonStyle={"mywallet-header-button"}
            src={require("../../assets/images/wallet.png")}
            title={"Cüzdanım"}
          />
          <PriceCard balance={userWalletBalance} />
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
                const basketQuantity = basketQuantities.find(
                  (q) => q.id === item.id
                );
                return (
                  <BasketProductCard
                    key={key}
                    mybasketCardStyle={"mywallet-product-card"}
                    mybasketCardPriceStyle={"mywallet-product-price"}
                    productImage={item.product.image}
                    productTitle={item.product.title}
                    productPrice={item.product.price}
                    productQuantity={item.product.quantity}
                    amount={basketQuantity.quantity}
                    disabledProduct={true}
                    disabledDecrement={true}
                    onIncrementClick={() => {
                      setBasketQuantities((prevQuantities) =>
                        prevQuantities.map((q) =>
                          q.id === item.id
                            ? { ...q, quantity: q.quantity + 1 }
                            : q
                        )
                      );
                    }}
                    onDecrementClick={() => {
                      if (basketQuantity.quantity > 1) {
                        setBasketQuantities((prevQuantities) =>
                          prevQuantities.map((q) =>
                            q.id === item.id
                              ? { ...q, quantity: q.quantity - 1 }
                              : q
                          )
                        );
                      }
                    }}
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
                <PriceCard balance={userWalletBalance} />
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
          <div className="chart-container">
            <Doughnut data={chartData(productPrices)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
