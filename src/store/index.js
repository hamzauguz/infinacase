import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./auth";
import product from "./product";
import cartReducer from "./cartSlice";
import balance from "./balance";

const cartPersistConfig = {
  key: "cart",
  storage,
};
const balancePersistConfig = {
  key: "balance",
  storage,
};
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedBalanceReducer = persistReducer(balancePersistConfig, balance);

const store = configureStore({
  reducer: {
    auth,
    product,
    card: persistedCartReducer,
    balance: persistedBalanceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
