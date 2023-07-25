import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";

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
