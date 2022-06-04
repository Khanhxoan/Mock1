import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import getUsersReducer from './getUserSlice'
import getQuestionsReducer from './getQuestionsSlice'
import getAmountQuestionReducer from './getAmountQuestionSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        getUsers: getUsersReducer,
        getQuestions: getQuestionsReducer,
        getAmountQuestion: getAmountQuestionReducer,
    }
})