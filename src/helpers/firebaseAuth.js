import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { authenticaton } from "../firebase/config";

const auth = getAuth();

export const register = async (email, password, displayName) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, { displayName });

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
    return true;
  } catch (error) {}
};
