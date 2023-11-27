import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/opentdbSlice";
import settingsReducer from "../features/settings/settingsSlice";
import questionReducer from "../features/questions/questionsSlice";
import quizStateReducer from "../features/quizState/quizStateSlice";

// Based on
// https://github.com/learnwithjason/lets-learn-redux-toolkit

export const store = configureStore({
  reducer: {
    questions: questionReducer,
    quizState: quizStateReducer,
    settings: settingsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
