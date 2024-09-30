import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addPost, fetchPosts, updatePostComments, updatePostLike } from './postOperations';
import { defaultStatus } from '../../constants';

const postInitialState = {
  posts: [],
  postError: null,
  postsOwners: [],
  isLoading: { posts: false, postsOwners: false },
  isLoadingPostsOwners: false,
  isLoadingComments: false,
};

const operationsArr = [addPost, fetchPosts, updatePostComments, updatePostLike];
const allOperationStatus = status => operationsArr.map(el => el[status]);

const handlePending = state => {
  state.postError = false;
  state.isLoading.posts = true;
  state.isLoading.postsOwners = true;
  state.isLoadingComments = true;
};

const handleRejected = (state, { payload }) => {
  state.postError = payload;
  state.isLoading.posts = false;
  state.isLoading.postsOwners = false;
  state.isLoadingComments = false;
};

const handleFulfilled = state => {
  state.isLoading.posts = false;
  state.isLoading.postsOwners = false;
  state.isLoadingComments = false;
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
      .addCase(fetchPosts.pending, state => {
        state.isLoadingPosts = true;
      })
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
      .addMatcher(isAnyOf(...allOperationStatus(defaultStatus.pending)), handlePending)
      .addMatcher(isAnyOf(...allOperationStatus(defaultStatus.fulfilled)), handleFulfilled)
      .addMatcher(isAnyOf(...allOperationStatus(defaultStatus.rejected)), handleRejected);
  },
});
export const { actUpdatePost, clearPosts, actUpdatePostItem } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
