import { createSlice } from "@reduxjs/toolkit";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/config";

export const addConfirmProductToFirestore = createAsyncThunk(
  "userbasket/addConfirmProductToFirestore",
  async (confirmproduct) => {
    const addConfirmProductRef = await addDoc(
      collection(db, "userbasket"),
      confirmproduct
    );
    const newConfirmProduct = { id: addConfirmProductRef.id, confirmproduct };
    return newConfirmProduct;
  }
);

export const fetchConfirmProduct = createAsyncThunk(
  "userbasket/fetchConfirmProduct",
  async () => {
    const querySnapshot = await getDocs(collection(db, "userbasket"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      basket: doc.data(),
    }));
    return products;
  }
);

// delete book
export const deleteConfirmProduct = createAsyncThunk(
  "userbasket/deleteConfirmProduct",
  async (id) => {
    const products = await getDocs(collection(db, "userbasket"));
    for (var snap of products.docs) {
      if (snap.id === id) {
        await deleteDoc(doc(db, "userbasket", snap.id));
      }
    }
    return id;
  }
);

// update book
export const updateConfirmProduct = createAsyncThunk(
  "userbasket/updateConfirmProduct",
  async (editedConfirmProduct) => {
    const products = await getDocs(collection(db, "userbasket"));
    for (var snap of products.docs) {
      if (snap.id === editedConfirmProduct.id) {
        const confirmProductRef = doc(db, "userbasket", snap.id);
        await updateDoc(confirmProductRef, editedConfirmProduct.basket);
      }
    }
    return editedConfirmProduct;
  }
);

const confirmProductSlice = createSlice({
  name: "confirmProducts",
  initialState: {
    productsArray: [],
  },
  // reducers: {

  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfirmProduct.fulfilled, (state, action) => {
        state.productsArray = action.payload;
      })
      .addCase(addConfirmProductToFirestore.fulfilled, (state, action) => {
        state.productsArray.push(action.payload);
      })
      .addCase(deleteConfirmProduct.fulfilled, (state, action) => {
        state.productsArray = state.productsArray.filter(
          (basket) => basket.id !== action.payload
        );
      })

      .addCase(updateConfirmProduct.fulfilled, (state, action) => {
        const { id, basket } = action.payload;
        const basketIndex = state.productsArray.findIndex(
          (basket) => basket.id === id
        );
        if (basketIndex !== -1) {
          state.productsArray[basketIndex] = { id: id, basket };
        }
      });
  },
});

export default confirmProductSlice.reducer;
