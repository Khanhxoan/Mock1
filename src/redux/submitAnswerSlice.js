import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        submit: {
            submit: null,
            isFetching: false, 
            error: false
        },
    },
    reducers: {
        submitStart: (state) => {
            state.submit.isFetching = true
        },
        submitSuccess: (state, action) => {
            state.submit.isFetching = false
            state.submit.currentUser = action.payload
            state.submit.error = false
        },
        submitFailed: (state) => {
            state.submit.isFetching = false
            state.submit.error = true
        },
    }
});

export const {
    submitSuccess, 
    submitFailed,
    submitStart,
} = authSlice.actions;

export default authSlice.reducer