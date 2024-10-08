import React, { useEffect, useState } from "react";
import HeaderButton from "../../components/header-button";
import BasketProductCard from "../../components/basket-product-card";
import PriceCard from "../../components/price-card";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteConfirmProduct,
  fetchConfirmProduct,
  updateConfirmProduct,
} from "../../store/confirmProductSlice";
import { filterItem } from "../../helpers/filterItem";
import LineBarChart from "../../components/line-bar-chart";
import {
  getproductPricesByCategory,
  labels,
} from "../../helpers/chart-helpers";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { updateBalance } from "../../store/balance";
import {
  showConfirmationDialog,
  totalProductPrice,
  totalQuantity,
} from "../../helpers/helpers";

import "./Styles.MyWallet.css";

const MyWallet = () => {
  const dispatch = useDispatch();
  const [confirmProducts, setConfirmProducts] = useState([]);
  const [userBasketId, setUserBasketId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const products = await dispatch(fetchConfirmProduct());
        setUserBasketId(products.payload.id);
        setConfirmProducts(products.payload.basket.basket);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const balanceData = useSelector((state) => state.balance.balanceArray);
  const findBalance = balanceData?.find(
    (item) => item.balance.userEmail === user.email
  );
  const userBalance = findBalance ? findBalance.balance.balance : 0;
  const beforeBalance = userBalance + totalProductPrice(confirmProducts);
  const categoryNames = filterItem.map((item) => item.categoryName);
  const productPrices = getproductPricesByCategory(
    categoryNames,
    confirmProducts
  );

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
      showConfirmationDialog(
        "Delete",
        "Are you sure you want to remove this product from the basket?",
        "question",
        () => {
          const deletedProduct = confirmProducts.filter(
            (product) => product.id !== productItem.id
          );

          setConfirmProducts(deletedProduct);
        }
      );
    }
  };

  const handleConfirmBasket = async (id) => {
    if (totalProductPrice(confirmProducts) > userBalance)
      return toast.error("Insufficient balance.");
    toast.loading("Updating the products in your basket...");
    await dispatch(updateConfirmProduct({ id, basket: confirmProducts })).then(
      () => {
        dispatch(
          updateBalance({
            id: findBalance.id,
            balance: userBalance - totalProductPrice(confirmProducts),
          })
        );
        if (totalQuantity(confirmProducts) === 0) {
          dispatch(deleteConfirmProduct(userBasketId));
        }
        toast.dismiss();
        toast.success("Your basket has been updated.");
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
                title={"My Wallet"}
              />
              <PriceCard balance={userBalance} />
            </div>
          </div>
          <div className="my-wallet-container">
            <div className="basket-balance-container">
              <div className="my-wallet-product-main">
                <span className="my-wallet-product-title">
                  Products in Your Basket ({totalQuantity(confirmProducts)})
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
                  Balance Information
                </span>
                <div className="mywallet-balance-container">
                  <div className="mywallet-balance-item-container">
                    <span className="mw-balance-item-title">
                      Your Total Balance:
                    </span>
                    <PriceCard balance={beforeBalance} />
                  </div>
                  <div className="mywallet-balance-item-container">
                    <span className="mw-balance-item-title">
                      Total Basket Amount:
                    </span>
                    <PriceCard balance={totalProductPrice(confirmProducts)} />
                  </div>
                  <div className="mywallet-balance-item-container">
                    <span className="mw-balance-item-title">
                      Remaining Balance:
                    </span>
                    <PriceCard balance={userBalance} />
                  </div>
                </div>
              </div>
            </div>
            <div className="my-wallet-bottom-container">
              <div className="expenses-container">
                <span className="my-wallet-product-title">
                  Distribution of Your Expenses
                </span>
                <div className="expenses-price">
                  <span className="mw-balance-item-title">
                    Your Total Expenses:
                  </span>
                  <PriceCard
                    priceCardStyle={"expenses-inside"}
                    balance={totalProductPrice(confirmProducts)}
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
              Confirm Basket
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default MyWallet;
