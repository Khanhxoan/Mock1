// edit, create question

import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    create: {
      isFetching: false,
      error: false,
      success: false,
    },
    edit: {
      isFetching: false,
      error: false,
      success: false,
    },
    getDetail: {
      isFetching: false,
      error: false,
      success: false,
      questionInfor: null,
    },
    delete: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    createStart: (state) => {
      state.create.isFetching = true;
    },
    createSuccess: (state) => {
      state.create.isFetching = false;
      state.create.success = true;
    },
    createFailed: (state) => {
      state.create.isFetching = false;
      state.create.error = true;
      state.create.success = false;
    },
    editStart: (state) => {
      state.edit.isFetching = true;
    },
    editSuccess: (state) => {
      state.edit.isFetching = false;
      state.edit.error = false;
      state.edit.success = true;
    },
    editFailed: (state) => {
      state.edit.isFetching = false;
      state.edit.error = true;
      state.edit.success = false;
    },
    getDetailStart: (state) => {
      state.getDetail.isFetching = true;
      state.getDetail.success = false;
    },
    getDetailSuccess: (state, action) => {
      state.getDetail.isFetching = false;
      state.getDetail.error = false;
      state.getDetail.questionInfor = action.payload;
      state.getDetail.success = true;
    },
    getDetailFailed: (state) => {
      state.getDetail.isFetching = false;
      state.getDetail.error = true;
      state.getDetail.success = false;
    },
    deleteStart: (state) => {
      state.delete.isFetching = true;
    },
    deleteSuccess: (state) => {
      state.delete.isFetching = false;
      state.delete.error = false;
      state.delete.success = true;
    },
    deleteFailed: (state) => {
      state.delete.isFetching = false;
      state.delete.error = true;
      state.delete.success = false;
    },
  },
});

export const {
  createStart,
  createSuccess,
  createFailed,
  editStart,
  editFailed,
  editSuccess,
  getDetailFailed,
  getDetailSuccess,
  getDetailStart,
  deleteFailed,
  deleteStart,
  deleteSuccess,
} = questionSlice.actions;

export default questionSlice.reducer;
