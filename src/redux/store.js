import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import getUsersReducer from "./getUserSlice";
import getQuestionsReducer from "./getQuestionsSlice";
import getAmountQuestionReducer from "./getAmountQuestionSlice";
import submitAnswerSlice from "./submitAnswerSlice";
import questionSliceReducer from "./questionSlice";
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
