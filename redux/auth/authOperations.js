import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { updateDataInFirestore, writeDataToFirestore } from '../../utils';

export const registerUser = createAsyncThunk('auth/registerUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    const { email: emailUser, uid } = credentials.user;
    await writeDataToFirestore({ collectionName: 'users', docID: uid, data: { emailUser, uid } });
    return { emailUser, uid };
  } catch (error) {
    const errorToast = error.code || error.message;
    return rejectWithValue(errorToast);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const { email: emailUser, displayName, photoURL, uid } = credentials.user;
    return { emailUser, displayName, photoURL, uid };
  } catch (error) {
    const errorToast = error.code || error.message;
    return rejectWithValue(errorToast);
  }
});

export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async (update, { rejectWithValue }) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
      await updateDataInFirestore({ collectionName: 'users', docId: user.uid, data: update });
      return update;
    } catch (error) {
      const errorToast = error.code || error.message;
      return rejectWithValue(errorToast);
    }
  }
  return rejectWithValue('Користувач не знайдений');
});

export const signOutUser = createAsyncThunk('auth/signOutUser', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error) {
    const errorToast = error.code || error.message;
    return rejectWithValue(errorToast);
  }
});
