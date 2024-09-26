import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDataFromFirestore,
  getItemFromFirestore,
  updateArrDataInFirestore,
  updateDataInFirestore,
  writeDataToFirestore,
} from '../../utils/firebase';

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ idPost, update, stateForChange = 'posts' }, { rejectWithValue }) => {
    try {
      await getItemFromFirestore('posts', idPost);
      await updateDataInFirestore('posts', idPost, update);
      return { idPost, update, stateForChange };
    } catch (error) {
      const errorToast = error.code || error.message;
      return rejectWithValue(errorToast);
    }
  }
);

export const updatePostLike = createAsyncThunk(
  'posts/updatePostLike',
  async ({ idPost, data, isAdd, stateForChange = 'posts' }, { rejectWithValue }) => {
    try {
      await updateArrDataInFirestore('posts', idPost, 'like', data, isAdd);
      const { like } = await getItemFromFirestore('posts', idPost);

      return { idPost, update: like, stateForChange };
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
  async ({ collectionName, sort, lastVisible, queryDoc, stateForChange = 'posts' }, { rejectWithValue }) => {
    try {
      const { postData } = await getDataFromFirestore({ collectionName, sort, lastVisible, queryDoc });

      // console.log('🚀 ~ data:', postData);
      return { postData, stateForChange };
    } catch (error) {
      const errorToast = error.code || error.message;
      return rejectWithValue(errorToast);
    }
  }
);

// export const fetchPostsOwners = createAsyncThunk(
//   'posts/fetchPostsOwners',
//   async ({ collectionName, sort, lastVisible, queryDoc }, { rejectWithValue }) => {
//     try {
//       const { postData } = await getDataFromFirestore({ collectionName, sort, lastVisible, queryDoc });

//       // console.log('🚀 ~ data:', postData);
//       return { postData };
//     } catch (error) {
//       const errorToast = error.code || error.message;
//       return rejectWithValue(errorToast);
//     }
//   }
// );
