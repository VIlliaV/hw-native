import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDataFromFirestore,
  getItemFromFirestore,
  updateArrDataInFirestore,
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

export const updatePostLike = createAsyncThunk(
  'posts/updatePostLike',
  async ({ idPost, data, isAdd }, { rejectWithValue }) => {
    try {
      await updateArrDataInFirestore('posts', idPost, 'like', data, isAdd);
      const { like } = await getItemFromFirestore('posts', idPost);

      return { idPost, update: like };
    } catch (error) {
      const errorToast = error.code || error.message;
      return rejectWithValue(errorToast);
    }
  }
);

export const addPost = createAsyncThunk('posts/addPost', async (newPost, { rejectWithValue }) => {
  try {
    const dataNewPost = await writeDataToFirestore('posts', null, newPost);
    return { ...newPost, ...dataNewPost };
  } catch (error) {
    const errorToast = error.code || error.message;
    return rejectWithValue(errorToast);
  }
});

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ collectionName, sort }, { rejectWithValue }) => {
    try {
      const postsData = await getDataFromFirestore(collectionName, sort);
      return postsData;
    } catch (error) {
      const errorToast = error.code || error.message;
      return rejectWithValue(errorToast);
    }
  }
);
