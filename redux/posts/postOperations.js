import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDataFromFirestore,
  getItemFromFirestore,
  updateDataInFirestore,
  writeDataToFirestore,
} from '../../utils/firebase';

export const updatePost = createAsyncThunk('posts/updatePost', async ({ idPost, update }, { rejectWithValue }) => {
  try {
    await getItemFromFirestore('posts', idPost);
    await updateDataInFirestore('posts', idPost, update);
    return { idPost, update };
  } catch (error) {
    const errorToast = error.code || error.message;
    return rejectWithValue(errorToast);
  }
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost, { rejectWithValue }) => {
  try {
    const idPost = await writeDataToFirestore('posts', null, newPost);
    return { ...newPost, id: idPost };
  } catch (error) {
    const errorToast = error.code || error.message;
    return rejectWithValue(errorToast);
  }
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (collectionName, { rejectWithValue }) => {
  try {
    const postsData = await getDataFromFirestore(collectionName);
    return postsData;
  } catch (error) {
    const errorToast = error.code || error.message;
    return rejectWithValue(errorToast);
  }
});
