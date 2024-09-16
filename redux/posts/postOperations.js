import { createAsyncThunk } from '@reduxjs/toolkit';
import { getItemFromFirestore, updateDataInFirestore, writeDataToFirestore } from '../../utils/firebase';

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
