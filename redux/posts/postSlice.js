import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addPost, fetchPosts, updatePost, updatePostLike } from './postOperations';

// import { loginUser, registerUser, updateUserProfile, signOutUser } from './authOperations';

const postInitialState = {
  posts: [],
  postError: null,
};

const handlePending = state => {
  state.postError = false;
};

// const handleFulfilled = (state, { payload }) => {
//   state.user = {
//     displayName: payload.displayName,
//     email: payload.emailUser,
//     photoURL: payload.photoURL,
//     uid: payload.uid,
//   };
// };

const handleRejected = (state, { payload }) => {
  state.postError = payload;
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: postInitialState,
  reducers: {
    actUpdatePost(state, { payload }) {
      findIndex = state.posts.findIndex(post => post.id === payload.idPost);
      if (findIndex !== -1) {
        state.posts[findIndex] = { ...state.posts[findIndex], ...payload.update };
      } else {
        state.postError = 'Немає такої публікації';
      }
    },
    actUpdatePostItem(state, { payload }) {
      if (state.posts.length === 0) return;
      findIndex = state.posts.findIndex(post => post.id === payload.idPost);
      if (findIndex !== -1) {
        state.posts[findIndex][payload.key] = payload.update;
      } else {
        state.postError = 'Немає такої публікації';
      }
    },
    clearPosts(state, _) {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        const { postData } = payload;
        state.posts.push(...postData);
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        findIndex = state.posts.findIndex(post => post.id === payload.idPost);
        if (findIndex !== -1) {
          state.posts[findIndex] = { ...state.posts[findIndex], ...payload.update };
        } else {
          state.postError = 'Немає такої публікації';
        }
      })
      .addCase(updatePostLike.fulfilled, (state, { payload }) => {
        findIndex = state.posts.findIndex(post => post.id === payload.idPost);
        if (findIndex !== -1) {
          state.posts[findIndex].like = [...payload.update];
        } else {
          state.postError = 'Немає такої публікації';
        }
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.posts.unshift(payload);
      })
      .addMatcher(
        isAnyOf(addPost.pending, updatePost.pending, updatePostLike.pending, fetchPosts.pending),
        handlePending
      )
      //   .addMatcher(isAnyOf(registerUser.fulfilled, loginUser.fulfilled), handleFulfilled)
      .addMatcher(
        isAnyOf(addPost.rejected, updatePost.rejected, updatePostLike.rejected, fetchPosts.rejected),
        handleRejected
      );
  },
});
export const { actUpdatePost, clearPosts, actUpdatePostItem } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
