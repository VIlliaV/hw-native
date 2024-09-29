import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addPost, fetchPosts, updatePostComments, updatePostLike } from './postOperations';

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
      const { idPost, update } = payload;
      findIndex = state.posts.findIndex(post => post.id === idPost);
      if (findIndex !== -1) {
        state.posts[findIndex] = { ...state.posts[findIndex], ...update };
      }
      findIndex = state.postsOwners.findIndex(post => post.id === idPost);
      if (findIndex !== -1) {
        state.postsOwners[findIndex] = { ...state.postsOwners[findIndex], ...update };
      }
    },

    actUpdatePostItem(state, { payload }) {
      const { idPost, update } = payload;
      if (state.posts.length === 0) return;
      findIndex = state.posts.findIndex(post => post.id === idPost);
      if (findIndex !== -1) {
        state.posts[findIndex][payload.key] = update;
      }
      findIndex = state.postsOwners.findIndex(post => post.id === idPost);
      if (findIndex !== -1) {
        state.postsOwners[findIndex][payload.key] = update;
      }
    },

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

      // .addCase(updatePost.fulfilled, (state, { payload }) => {
      //   const { idPost, update } = payload;
      //   findIndex = state.posts.findIndex(post => post.id === idPost);
      //   if (findIndex !== -1) {
      //     state.posts[findIndex] = { ...state.posts[findIndex], ...update };
      //   }
      //   findIndex = state.postsOwners.findIndex(post => post.id === idPost);
      //   if (findIndex !== -1) {
      //     state.postsOwners[findIndex] = { ...state.postsOwners[findIndex], ...update };
      //   }
      // })
      .addCase(updatePostLike.fulfilled, (state, { payload }) => {
        const { idPost, update } = payload;
        findIndex = state.posts.findIndex(post => post.id === idPost);
        if (findIndex !== -1) {
          state.posts[findIndex].like = [...update];
        }
        findIndex = state.postsOwners.findIndex(post => post.id === idPost);
        if (findIndex !== -1) {
          state.postsOwners[findIndex].like = [...update];
        }
      })
      .addCase(updatePostComments.fulfilled, (state, { payload }) => {
        const { idPost, update } = payload;
        findIndex = state.posts.findIndex(post => post.id === idPost);
        if (findIndex !== -1) {
          state.posts[findIndex].comments = [...update];
        }
        findIndex = state.postsOwners.findIndex(post => post.id === idPost);
        if (findIndex !== -1) {
          state.postsOwners[findIndex].comments = [...update];
        }
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.posts.unshift(payload);
        state.postsOwners.unshift(payload);
      })
      .addMatcher(
        isAnyOf(
          addPost.pending,
          updatePostComments.pending,
          // updatePost.pending,
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
          updatePostComments.rejected,
          // updatePost.rejected,
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
