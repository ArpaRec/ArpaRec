// Code structure comes from https://github.com/learnwithjason/lets-learn-redux-toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * `pending` - Waiting for the questions
 *
 * `ongoing` - Quiz is being solved
 *
 * `finished` - Quiz is finished
 *
 * `nothing found` - Got empty list of questions
 */
type QuizStateType = "pending" | "ongoing" | "finished" | "nothing found";

const initialState: QuizStateType = "ongoing" as QuizStateType;

const quizStateSlice = createSlice({
  name: "quizState",
  initialState,
  reducers: {
    setGameState(state, action: PayloadAction<QuizStateType>) {
      if (state !== action.payload) state = action.payload;
      return state;
    },
  },
});

export const { setGameState } = quizStateSlice.actions;
export default quizStateSlice.reducer;
