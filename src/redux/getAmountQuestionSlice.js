import { createSlice } from "@reduxjs/toolkit";

const getAmountQuestionReducer = createSlice({
    name: 'questions',
    initialState: {
        questions: {
            allQuestions: null,
            isFetching: false,
            error: false
        },
    },

    reducers: {
        getQuestionsStart: (state) => {
            state.questions.isFetching = true;   
        },
        getQuestionsSuccess: (state, action) => {
            state.questions.isFetching = false;
            state.questions.allQuestions = action.payload;
        },
        getQuestionsFailed: (state) => {
            state.questions.isFetching = false;
            state.questions.error =  true
        }
    }
});

export const {
    getQuestionsFailed,
    getQuestionsStart,
    getQuestionsSuccess
} = getAmountQuestionReducer.actions;

export default getAmountQuestionReducer.reducer