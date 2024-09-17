import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addPost, fetchPosts, updatePost } from './postOperations';
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
  //   reducers: {
  //     setUser(state, { payload }) {
  //       state.user = payload;
  //     },
  //     clearUser(state) {
  //       state.user = {};
  //     },
  //   },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        findIndex = state.posts.findIndex(post => post.id === payload.idPost);
        state.posts[findIndex] = { ...state.posts[findIndex], ...payload.update };
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.posts.push(payload);
      })
      .addMatcher(isAnyOf(addPost.pending, updatePost.pending, fetchPosts.pending), handlePending)
      //   .addMatcher(isAnyOf(registerUser.fulfilled, loginUser.fulfilled), handleFulfilled)
      .addMatcher(isAnyOf(addPost.rejected, updatePost.rejected, fetchPosts.rejected), handleRejected);
  },
});
// export const { setUser, clearUser } = authSlice.actions;
export const postsReducer = postsSlice.reducer;
