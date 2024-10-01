import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDataFromFirestore,
  getItemFromFirestore,
  updateArrDataInFirestore,
  writeDataToFirestore,
} from '../../utils';

// export const updatePost = createAsyncThunk('posts/updatePost', async ({ idPost, update }, { rejectWithValue }) => {
//   try {
//     await getItemFromFirestore({collectionName: 'posts', docId: idPost});
//     await updateDataInFirestore({collectionName: 'posts',docId: idPost,data: update});
//     return { idPost, update };
//   } catch (error) {
//     const errorToast = error.code || error.message;
//     return rejectWithValue(errorToast);
//   }
// });

export const updatePostLike = createAsyncThunk(
  'posts/updatePostLike',
  async ({ idPost, data, isAdd }, { rejectWithValue }) => {
    try {
      await updateArrDataInFirestore({ collectionName: 'posts', docId: idPost, keyPost: 'like', data, isAdd });
      const { like } = await getItemFromFirestore({ collectionName: 'posts', docId: idPost });

      return { idPost, update: like };
    } catch (error) {
      const errorToast = error.code || error.message;
      return rejectWithValue(errorToast);
    }
  }
);

export const updatePostComments = createAsyncThunk(
  'posts/updatePostComments',
  async ({ idPost, data }, { rejectWithValue }) => {
    try {
      await updateArrDataInFirestore({
        collectionName: 'posts',
        docId: idPost,
        keyPost: 'comments',
        data,
        timestamp: true,
      });
      const { comments } = await getItemFromFirestore({ collectionName: 'posts', docId: idPost });

      return { idPost, update: comments };
    } catch (error) {
      const errorToast = error.code || error.message;
      return rejectWithValue(errorToast);
    }
  }
);

export const addPost = createAsyncThunk('posts/addPost', async (newPost, { rejectWithValue }) => {
  try {
    const dataNewPost = await writeDataToFirestore({ collectionName: 'posts', data: newPost });
    return { ...newPost, ...dataNewPost };
  } catch (error) {
    const errorToast = error.code || error.message;
    return rejectWithValue(errorToast);
  }
});

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ collectionName, sort, lastVisible, queryDoc, stateForChange = 'posts' }, { rejectWithValue }) => {
    try {
      const { postData } = await getDataFromFirestore({ collectionName, sort, lastVisible, queryDoc });
      return { postData, stateForChange };
    } catch (error) {
      const errorToast = error.code || error.message;
      return rejectWithValue(errorToast);
    }
  }
);
