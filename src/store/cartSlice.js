import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  card: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const { id } = payload;

      const findIndex = state.card.findIndex((item) => item.id === id);
      if (findIndex !== -1) {
        state.card[findIndex].quantity += 1;
      } else {
        state.card.push({
          ...payload,
          quantity: 1,
        });
      }
    },
    increment(state, { payload }) {
      const findIndex = state.card.findIndex((item) => item.id === payload);
      if (findIndex !== -1) {
        state.card[findIndex].quantity += 1;
      }
    },
    decrement(state, { payload }) {
      const findIndex = state.card.findIndex((item) => item.id === payload);
      if (findIndex !== -1) {
        const item = state.card[findIndex];
        if (item.quantity >= 1) {
          item.quantity -= 1;
        }
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export default cartReducer;
