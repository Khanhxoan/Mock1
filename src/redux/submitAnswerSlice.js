import { createSlice } from "@reduxjs/toolkit";

const submitAnswerSlice = createSlice({
  name: "submit",
  initialState: {
    submit: {
      isFetching: false,
      success: false,
      error: false,
      score: [],
    },
  },
  reducers: {
    submitStart: (state) => {
      state.submit.isFetching = true;
      state.submit.success = false;
    },
    submitSuccess: (state, action) => {
      state.submit.isFetching = false;
      state.submit.error = false;
      state.submit.success = true;
      state.submit.score = action.payload?.filter((e) => e.result === true);
    },
    submitFailed: (state) => {
      state.submit.isFetching = false;
      state.submit.error = true;
      state.submit.success = false;
    },
    resetScore: (state) => {
      state.submit.score = [];
    },
  },
});

export const { submitSuccess, submitFailed, submitStart, resetScore } =
  submitAnswerSlice.actions;

export default submitAnswerSlice.reducer;
