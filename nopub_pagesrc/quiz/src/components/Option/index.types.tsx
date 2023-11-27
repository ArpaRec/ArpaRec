import { IOption } from "../../features/questions/questionsSlice";

export interface StyledOptionProps extends IOption {
  /** Redux id of a questions */
  questionID: number;
  /** Redux id of a correct option */
  correctOptionID: number;
  /** Redux id of a selected option */
  selectedOptionID: number | null;
}
