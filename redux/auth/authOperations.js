import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { email: emailUser, displayName, photoURL, uid } = credentials.user;
      return { emailUser, displayName, photoURL, uid };
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { email: emailUser, displayName, photoURL, uid } = credentials.user;
      return { emailUser, displayName, photoURL, uid };
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (update, { rejectWithValue }) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, update);
        return update;
      } catch (error) {
        return rejectWithValue(error.code);
      }
    }
    return rejectWithValue("Користувач не знайдений");
  }
);

export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);
