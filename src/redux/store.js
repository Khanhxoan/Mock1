import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./UserSlice/authSlice";
import getUsersReducer from "./UserSlice/getUserSlice";
import getQuestionsReducer from "./QuestionSlice/getQuestionsSlice";
import getAmountQuestionReducer from "./QuestionSlice/getAmountQuestionSlice";
import submitAnswerSlice from "./QuestionSlice/submitAnswerSlice";
import questionSliceReducer from "./QuestionSlice/questionSlice";
import { encryptTransform } from "redux-persist-transform-encrypt";
// import redux-persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  getUsers: getUsersReducer,
  getQuestions: getQuestionsReducer,
  getAmountQuestion: getAmountQuestionReducer,
  submit: submitAnswerSlice,
  question: questionSliceReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: "my-super-secret-key",
      onError: function (error) {
        //
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
