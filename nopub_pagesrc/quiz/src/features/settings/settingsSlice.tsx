// Code structure comes from https://github.com/learnwithjason/lets-learn-redux-toolkit
import { difficultiesList, type DifficultiesOption } from "./difficultiesList";
import { categoriesList, type CategoryOption } from "./categoriesList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { typesList, type TypeOption } from "./typesList";

/** Settings parameters */
interface SettingsState {
  /** Number of questions returned from API */
  questionsNumber: number;
  /** Category of questions */
  category: CategoryOption;
  /** Difficulty of questions */
  difficulty: DifficultiesOption;
  /** Questions type */
  type: TypeOption;
}

const defaultInitialState: SettingsState = {
  questionsNumber: 10,
  category: categoriesList[0],
  difficulty: difficultiesList[0],
  type: typesList[0],
};
const localStorageInitialState: string = localStorage.getItem("settings") ?? "null";
const initialState: SettingsState = JSON.parse(localStorageInitialState) ?? defaultInitialState;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettingsState(state, action: PayloadAction<SettingsState>) {
      state.questionsNumber = action.payload.questionsNumber;
      state.category = action.payload.category;
      state.difficulty = action.payload.difficulty;
      state.type = action.payload.type;
      localStorage.setItem("settings", JSON.stringify(state));
    },
  },
});

export const { setSettingsState } = settingsSlice.actions;
export default settingsSlice.reducer;
