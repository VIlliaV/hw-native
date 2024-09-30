import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { loginUser, registerUser, updateUserProfile, signOutUser } from './authOperations';
import { defaultStatus } from '../../constants/reduxConstants';

const authInitialState = {
  user: {},
  userError: null,
  isLoadingUser: false,
};

const operationsArr = [loginUser, registerUser, updateUserProfile, signOutUser];
const allOperationStatus = status => operationsArr.map(el => el[status]);

const handlePending = state => {
  state.userError = false;
  state.isLoadingUser = true;
};

const handleFulfilled = (state, { payload }) => {
  state.user = {
    displayName: payload.displayName,
    email: payload.emailUser,
    photoURL: payload.photoURL,
    uid: payload.uid,
  };
  state.isLoadingUser = false;
};

const handleRejected = (state, { payload }) => {
  state.userError = payload;
  state.isLoadingUser = false;
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
        state.isLoadingUser = false;
      })
      .addCase(signOutUser.fulfilled, state => {
        state.user = {};
        state.isLoadingUser = false;
      })
      .addMatcher(isAnyOf(...allOperationStatus(defaultStatus.pending)), handlePending)
      .addMatcher(isAnyOf(registerUser.fulfilled, loginUser.fulfilled), handleFulfilled)
      .addMatcher(isAnyOf(...allOperationStatus(defaultStatus.rejected)), handleRejected);
  },
});
export const { setUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
