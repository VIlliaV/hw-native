import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addPost, fetchPosts, updatePost, updatePostLike, fetchPostsOwners } from './postOperations';

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
      findIndex = state.posts.findIndex(post => post.id === payload.idPost);
      if (findIndex !== -1) {
        state.posts[findIndex] = { ...state.posts[findIndex], ...payload.update };
      }
    },
    actUpdatePostOwner(state, { payload }) {
      findIndex = state.postsOwners.findIndex(post => post.id === payload.idPost);
      if (findIndex !== -1) {
        state.postsOwners[findIndex] = { ...state.postsOwners[findIndex], ...payload.update };
      }
    },
    actUpdatePostItem(state, { payload }) {
      if (state.posts.length === 0) return;
      findIndex = state.posts.findIndex(post => post.id === payload.idPost);
      if (findIndex !== -1) {
        state.posts[findIndex][payload.key] = payload.update;
      }
    },
    actUpdatePostOwnerItem(state, { payload }) {
      if (state.postsOwners.length === 0) return;
      findIndex = state.postsOwners.findIndex(post => post.id === payload.idPost);
      if (findIndex !== -1) {
        state.postsOwners[findIndex][payload.key] = payload.update;
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
      .addCase(fetchPostsOwners.fulfilled, (state, { payload }) => {
        const { postData } = payload;
        state.postsOwners.push(...postData);
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        findIndex = state.posts.findIndex(post => post.id === payload.idPost);
        if (findIndex !== -1) {
          state.posts[findIndex] = { ...state.posts[findIndex], ...payload.update };
        }
      })
      .addCase(updatePostLike.fulfilled, (state, { payload }) => {
        findIndex = state[payload.stateForChange].findIndex(post => post.id === payload.idPost);
        if (findIndex !== -1) {
          state[payload.stateForChange][findIndex].like = [...payload.update];
        }
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.posts.unshift(payload);
      })
      .addMatcher(
        isAnyOf(
          addPost.pending,
          updatePost.pending,
          updatePostLike.pending,
          fetchPosts.pending,
          fetchPostsOwners.pending
        ),
        handlePending
      )
      //   .addMatcher(isAnyOf(registerUser.fulfilled, loginUser.fulfilled), handleFulfilled)
      .addMatcher(
        isAnyOf(
          addPost.rejected,
          updatePost.rejected,
          updatePostLike.rejected,
          fetchPosts.rejected,
          fetchPostsOwners.rejected
        ),
        handleRejected
      );
  },
});
export const { actUpdatePost, clearPosts, actUpdatePostItem, actUpdatePostOwnerItem, actUpdatePostOwner } =
  postsSlice.actions;
export const postsReducer = postsSlice.reducer;
