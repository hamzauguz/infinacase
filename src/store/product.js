import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/config";

export const fetchProducts = createAsyncThunk(
  "books/fetchProducts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "Products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      product: doc.data(),
    }));
    return products;
  }
);

const products = createSlice({
  name: "Products",
  initialState: {
    productsArray: [],
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsArray = action.payload;
    });
  },
});

export default products.reducer;
