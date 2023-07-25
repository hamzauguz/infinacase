import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { authenticaton } from "../firebase/config";
import store from "../store";
import { login as loginHandle, logout as logoutHandle } from "../store/auth";

const auth = getAuth();

export const register = async (email, password, displayName) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then(async (user) => {
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
  } catch (error) {}
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {}
};

export const logout = async () => {
  try {
    const { user } = await signOut(auth);
    store.dispatch(logoutHandle());
    return true;
  } catch (error) {}
};
