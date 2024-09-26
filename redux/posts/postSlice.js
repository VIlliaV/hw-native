import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addPost, fetchPosts, updatePost, updatePostLike } from './postOperations';

// import { loginUser, registerUser, updateUserProfile, signOutUser } from './authOperations';

const postInitialState = {
  posts: [],
  postError: null,
  postsOwners: [],
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
      const { idPost, update, stateForChange } = payload;
      findIndex = state[stateForChange].findIndex(post => post.id === idPost);
      if (findIndex !== -1) {
        state[stateForChange][findIndex] = { ...state[stateForChange][findIndex], ...update };
      }
    },
    // actUpdatePostOwner(state, { payload }) {
    //   findIndex = state.postsOwners.findIndex(post => post.id === payload.idPost);
    //   if (findIndex !== -1) {
    //     state.postsOwners[findIndex] = { ...state.postsOwners[findIndex], ...payload.update };
    //   }
    // },
    actUpdatePostItem(state, { payload }) {
      const { idPost, update, stateForChange } = payload;
      if (state[stateForChange].length === 0) return;
      findIndex = state[stateForChange].findIndex(post => post.id === idPost);
      if (findIndex !== -1) {
        state[stateForChange][findIndex][payload.key] = update;
      }
    },
    // actUpdatePostOwnerItem(state, { payload }) {
    //   if (state.postsOwners.length === 0) return;
    //   findIndex = state.postsOwners.findIndex(post => post.id === payload.idPost);
    //   if (findIndex !== -1) {
    //     state.postsOwners[findIndex][payload.key] = payload.update;
    //   }
    // },
    clearPosts(state, _) {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        const { postData, stateForChange } = payload;
        state[stateForChange].push(...postData);
      })
      // .addCase(fetchPostsOwners.fulfilled, (state, { payload }) => {
      //   const { postData } = payload;
      //   state.postsOwners.push(...postData);
      // })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        const { idPost, stateForChange, update } = payload;
        findIndex = state[stateForChange].findIndex(post => post.id === idPost);
        if (findIndex !== -1) {
          state[stateForChange][findIndex] = { ...state[stateForChange][findIndex], ...update };
        }
      })
      .addCase(updatePostLike.fulfilled, (state, { payload }) => {
        const { idPost, stateForChange, update } = payload;
        findIndex = state[stateForChange].findIndex(post => post.id === idPost);
        if (findIndex !== -1) {
          state[stateForChange][findIndex].like = [...update];
        }
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.posts.unshift(payload);
        state.postsOwners.unshift(payload);
      })
      .addMatcher(
        isAnyOf(
          addPost.pending,
          updatePost.pending,
          updatePostLike.pending,
          fetchPosts.pending
          // fetchPostsOwners.pending
        ),
        handlePending
      )
      //   .addMatcher(isAnyOf(registerUser.fulfilled, loginUser.fulfilled), handleFulfilled)
      .addMatcher(
        isAnyOf(
          addPost.rejected,
          updatePost.rejected,
          updatePostLike.rejected,
          fetchPosts.rejected
          // fetchPostsOwners.rejected
        ),
        handleRejected
      );
  },
});
export const { actUpdatePost, clearPosts, actUpdatePostItem } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
