import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import store, { persistor } from "../store";
import { login as loginHandle, logout as logoutHandle } from "../store/auth";
import { clear } from "../store/cartSlice";
import { fetchBalance } from "../store/balance";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
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

onSnapshot(collection(db, "userwallet"), (querySnapshot) => {
  const updatedBalances = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    balance: doc.data(),
  }));
  store.dispatch(fetchBalance.fulfilled(updatedBalances));
});
