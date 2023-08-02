import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (state) => state.card.card;

export const selectTotalQuantity = (state) =>
  state.card.card.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state) =>
  state.card.card.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

export const selectBalanceState = (state) => state.balance;

export const selectCurrentUserBalance = createSelector(
  [selectBalanceState, (state) => state.auth.user.email],
  (balanceState, currentUserEmail) => {
    const currentUserBalance = balanceState.balanceArray.find(
      (item) => item.balance.userEmail === currentUserEmail
    );

    return currentUserBalance ? currentUserBalance.balance.balance : 0;
  }
);

export const selectConfirmProductState = (state) => state.confirmProduct;

export const selectCurrentUserBasketItems = createSelector(
  [selectConfirmProductState, (state) => state.auth.user.email],
  (confirmProductState, currentUserEmail) => {
    const findConfirmProduct = confirmProductState.productsArray.find(
      (item) => item.basket.userEmail === currentUserEmail
    );

    return findConfirmProduct?.basket?.basket ?? [];
  }
);
