// Code structure comes from https://github.com/learnwithjason/lets-learn-redux-toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialStateData from "./initialStateData";

interface IToggleOption {
  questionID: number;
  optionID: number;
}

export interface IOption {
  optionID: number;
  optionText: string;
}

export interface IQuestion {
  questionID: number;
  question: string;
  category: string;
  difficulty: string;
  selectedOptionID: number | null;
  correctOptionID: number;
  options: IOption[];
}

const questionsSlice = createSlice({
  name: "questions",
  initialState: initialStateData,
  reducers: {
    selectAnswer(state, action: PayloadAction<IToggleOption>) {
      const { questionID, optionID } = action.payload;
      const questionIndex = state.findIndex((question) => question.questionID === questionID);
      state[questionIndex].selectedOptionID =
        state[questionIndex].selectedOptionID !== optionID ? optionID : null;
    },
    setNewQuestions(state, action: PayloadAction<IQuestion[]>) {
      state = action.payload;
      return state;
    },
  },
});

export const { selectAnswer, setNewQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
