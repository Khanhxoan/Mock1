import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    refresh: {
      isFetching: false,
      error: false,
    },
    logout: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    refreshStart: (state) => {
      state.refresh.isFetching = true;
    },
    refreshSuccess: (state, action) => {
      state.refresh.isFetching = false;
      state.login.currentUser.tokens = action.payload;
      state.refresh.error = false;
    },
    refreshFailed: (state) => {
      state.refresh.isFetching = false;
      state.refresh.error = true;
    },
    logoutStart: (state) => {
      state.logout.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.logout.isFetching = false;
      state.login.currentUser = null;
    },
    logoutFailed: (state) => {
      state.logout.isFetching = false;
      state.logout.error = true;
    },
  },
});

export const {
  loginSuccess,
  loginFailed,
  loginStart,
  registerStart,
  registerSuccess,
  registerFailed,
  refreshFailed,
  refreshStart,
  refreshSuccess,
  logoutStart,
  logoutFailed,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
