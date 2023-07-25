import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import product from "./product";

const store = configureStore({
  reducer: { auth, product },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
