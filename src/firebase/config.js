import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import store, { persistor } from "../store";
import { login as loginHandle, logout as logoutHandle } from "../store/auth";
import { clear } from "../store/cartSlice";

const firebaseConfig = {
  apiKey: "AIzaSyAjnoiyMGTqEKE8t5s4PHfFkx7S_HVKcBA",
  authDomain: "infinacase.firebaseapp.com",
  projectId: "infinacase",
  storageBucket: "infinacase.appspot.com",
  messagingSenderId: "183630088918",
  appId: "1:183630088918:web:eb2eebfcc974ff736e5777",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const db = getFirestore(app);
export const authenticaton = getAuth(app);
export const storage = getStorage();

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        email: user.email,
        uid: user.uid,
        fullName: user.displayName,
      })
    );
  } else {
    persistor.purge();
    store.dispatch(logoutHandle());
    store.dispatch(clear());
  }
});
