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

// add book to firestore
export const addBalanceToFirestore = createAsyncThunk(
  "balance/addBalanceToFirestore",
  async (balance) => {
    const addBalanceRef = await addDoc(collection(db, "userwallet"), balance);
    const newBalance = { id: addBalanceRef.id, balance };
    return newBalance;
  }
);

// fetch books
export const fetchBalance = createAsyncThunk(
  "balance/fetchBalance",
  async () => {
    const querySnapshot = await getDocs(collection(db, "userwallet"));
    const balance = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      balance: doc.data(),
    }));
    return balance;
  }
);
export const updateBalanceAsync = createAsyncThunk(
  "balance/updateBalanceAsync",
  async (editedBalance) => {
    const balanceRef = doc(db, "userwallet", editedBalance.id);
    await updateDoc(balanceRef, { balance: editedBalance.balance });
    return editedBalance;
  }
);
export const updateBalance = createAsyncThunk(
  "balance/updateBalance",
  async (editedBalance) => {
    // const balance = await getDocs(collection(db, "userwallet"));
    // for (var snap of balance.docs) {
    //   if (snap.id === editedBalance.id) {
    //     const balanceRef = doc(db, "userwallet", snap.id);
    //     await updateDoc(balanceRef, editedBalance.balance);
    //   }
    // }
    // return editedBalance;
    const balanceRef = doc(db, "userwallet", editedBalance.id);
    await updateDoc(balanceRef, { balance: editedBalance.balance });
    return editedBalance;
  }
);

const balance = createSlice({
  name: "balance",
  initialState: {
    balanceArray: [],
  },
  // reducers: {

  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balanceArray = action.payload;
      })
      .addCase(addBalanceToFirestore.fulfilled, (state, action) => {
        state.balanceArray.push(action.payload);
      })

      .addCase(updateBalanceAsync.fulfilled, (state, action) => {
        const { id, balance } = action.payload;
        const balanceIndex = state.balanceArray.findIndex(
          (balance) => balance.id === id
        );
        if (balanceIndex !== -1) {
          state.balanceArray[balanceIndex] = {
            id: id,
            balance,
          };
        }
      });
  },
});

export default balance.reducer;
