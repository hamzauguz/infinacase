export const selectCartItems = (state) => state.card.card;

export const selectTotalQuantity = (state) =>
  state.card.card.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state) =>
  state.card.card.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
