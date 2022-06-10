import { createSlice } from "@reduxjs/toolkit";

const getUserSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false
        },
        createUser: {
            isFetching: false,
            success: false,
            error: false,
        },
        updateUser: {
            userScore: 0
        }
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
        },
        createUsersStart: (state) => {
            state.users.isFetching = true;   
        },
        createUsersSuccess: (state) => {
            state.users.isFetching = false;
            state.users.success = true
        },
        createUsersFailed: (state) => {
            state.users.success = false;
            state.users.error =  true
        },
        // updateUserScoreSuccess: (state, action) => {
        //     state.updateUser.userScore = action.payload
        // }
    }
});

export const {
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
    createUsersFailed,createUsersStart,createUsersSuccess
} = getUserSlice.actions;

export default getUserSlice.reducer