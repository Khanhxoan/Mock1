import { createSlice } from "@reduxjs/toolkit";

const getUserSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false
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
            state.users.error =  true
        }
    }
});

export const {
    getUsersFailed,
    getUsersStart,
    getUsersSuccess
} = getUserSlice.actions;

export default getUserSlice.reducer