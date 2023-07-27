import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import store from "../store";
import { login as loginHandle, logout as logoutHandle } from "../store/auth";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const auth = getAuth();

export const getUserCollection = (firestore, collectionName) => {
  return collection(firestore, collectionName);
};

export const getUserData = async (userEmail) => {
  const userWalletRef = getUserCollection(db, "userwallet");

  try {
    const querySnapshot = await getDocs(userWalletRef);
    const userWalletData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.userEmail === userEmail) {
        userWalletData.push(data.balance);
      }
    });

    return userWalletData;
  } catch (error) {
    console.log("Hata oluştu: ", error);
    return [];
  }
};

export const register = async (email, password, displayName) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then(async (user) => {
      toast.success("Kayıt başarıyla oluşturuldu.");

      // const userWalletRef = collection(db, "userwallet");
      const userWalletRef = getUserCollection(db, "userwallet");
      console.log("userWalletRef: ", userWalletRef);
      await addDoc(userWalletRef, {
        userEmail: user.user.email,
        balance: 30000,
      });

      await updateProfile(auth.currentUser, { displayName });
      store.dispatch(
        loginHandle({
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
          fullName: auth.currentUser.displayName,
        })
      );
    });
    return user;
  } catch (error) {
    console.log("error::: ", error);
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    const { user } = await signOut(auth);
    store.dispatch(logoutHandle());
    return true;
  } catch (error) {
    toast.error(error);
  }
};
