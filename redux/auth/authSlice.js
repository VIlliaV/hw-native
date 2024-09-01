import { createSlice } from "@reduxjs/toolkit";
// import {
//   login,
//   signUp,
//   logOut,
//   refreshUser,
//   updateAvatar,
// } from "./authOperations";

const authInitialState = {
  user: {
    name: null,
    email: null,
    avatarURL: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  loginError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  // extraReducers: builder => {
  //   builder
  //     .addCase(login.pending, state => {
  //       state.loginError = false;
  //     })
  //     .addCase(login.fulfilled, (state, { payload }) => {
  //       state.user = payload.user;
  //       state.token = payload.token;
  //       state.isLoggedIn = true;
  //     })
  //     .addCase(login.rejected, state => {
  //       state.loginError = true;
  //     })
  //     .addCase(signUp.pending, state => {
  //       state.loginError = false;
  //     })
  //     .addCase(signUp.fulfilled, (state, { payload }) => {
  //       state.user = payload.user;
  //       state.token = payload.token;
  //       state.isLoggedIn = true;
  //     })
  //     .addCase(signUp.rejected, state => {
  //       state.loginError = true;
  //     })
  //     .addCase(logOut.fulfilled, state => {
  //       state.user.name = null;
  //       state.user.email = null;
  //       state.token = null;
  //       state.isLoggedIn = false;
  //     })
  //     .addCase(refreshUser.pending, state => {
  //       state.isRefreshing = true;
  //       state.loginError = false;
  //     })
  //     .addCase(refreshUser.fulfilled, (state, { payload }) => {
  //       state.user = payload;

  //       state.isLoggedIn = true;
  //       state.isRefreshing = false;
  //     })
  //     .addCase(refreshUser.rejected, state => {
  //       state.isRefreshing = false;
  //     })
  //     .addCase(updateAvatar.pending, state => {
  //       state.loginError = false;
  //     })
  //     .addCase(updateAvatar.fulfilled, (state, { payload }) => {
  //       state.user.avatarURL = payload;
  //     })
  //     .addCase(updateAvatar.rejected, state => {
  //       state.loginError = true;
  //     });
  // },
});

export const authReducer = authSlice.reducer;
