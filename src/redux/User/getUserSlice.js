import { createSlice } from "@reduxjs/toolkit";

const getUserSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: null,
      isFetching: false,
      error: false,
    },
    createUser: {
      isFetching: false,
      success: false,
      error: false,
    },
    updateUser: {
      isFetching: false,
      success: false,
      error: false,
    },
  },

  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getUsersFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    createUsersStart: (state) => {
      state.createUser.isFetching = true;
    },
    createUsersSuccess: (state) => {
      state.createUser.isFetching = false;
      state.createUser.success = true;
    },
    createUsersFailed: (state) => {
      state.createUser.isFetching = false;
      state.createUser.success = false;
      state.createUser.error = true;
    },
    updateUserStart: (state) => {
      state.updateUser.isFetching = true;
    },
    updateUserSuccess: (state) => {
      state.updateUser.isFetching = false;
      state.updateUser.success = true;
    },
    updateUserFailed: (state) => {
      state.updateUser.isFetching = false;
      state.updateUser.error = true;
    },
  },
});

export const {
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
  createUsersFailed,
  createUsersStart,
  createUsersSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
} = getUserSlice.actions;

export default getUserSlice.reducer;
