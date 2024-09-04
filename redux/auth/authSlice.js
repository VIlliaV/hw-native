import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { loginUser, registerUser, updateUserProfile, signOutUser } from './authOperations';

const authInitialState = {
  user: {},
  userError: null,
};

const handlePending = state => {
  state.userError = false;
};

const handleFulfilled = (state, { payload }) => {
  state.user = {
    displayName: payload.displayName,
    email: payload.emailUser,
    photoURL: payload.photoURL,
    uid: payload.uid,
  };
};

const handleRejected = (state, { payload }) => {
  state.userError = payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
    clearUser(state) {
      state.user = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, ...payload };
      })
      .addCase(signOutUser.fulfilled, state => {
        state.user = {};
      })
      .addMatcher(
        isAnyOf(registerUser.pending, loginUser.pending, updateUserProfile.pending, signOutUser.pending),
        handlePending
      )
      .addMatcher(isAnyOf(registerUser.fulfilled, loginUser.fulfilled), handleFulfilled)
      .addMatcher(
        isAnyOf(registerUser.rejected, loginUser.rejected, updateUserProfile.rejected, signOutUser.rejected),
        handleRejected
      );
  },
});
export const { setUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
