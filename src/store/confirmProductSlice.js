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
import { selectCurrentUserEmail } from "./selectors";

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
  async (_, { getState }) => {
    const currentUserEmail = selectCurrentUserEmail(getState());
    const querySnapshot = await getDocs(collection(db, "userbasket"));
    const products = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        basket: doc.data(),
      }))
      .find((product) => product.basket.userEmail === currentUserEmail);

    return products;
  }
);

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

export const updateConfirmProduct = createAsyncThunk(
  "userbasket/updateConfirmProduct",
  async (editedConfirmProduct) => {
    const productsRef = doc(db, "userbasket", editedConfirmProduct.id);
    await updateDoc(productsRef, { basket: editedConfirmProduct.basket });
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
      .addCase(addConfirmProductToFirestore.fulfilled)
      .addCase(deleteConfirmProduct.fulfilled)
      .addCase(updateConfirmProduct.fulfilled, (state, action) => {
        const { id, basket } = action.payload;
        const basketIndex = basket.findIndex((item) => item.id === id);
        if (basketIndex !== -1) {
          basket.basket[basketIndex] = { id: id, basket: basket };
        }
      });
  },
});

export default confirmProductSlice.reducer;
