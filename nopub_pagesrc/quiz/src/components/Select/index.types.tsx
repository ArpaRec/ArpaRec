/**
 * Object representing one element of the options list in select
 */
export interface IOption {
  /** Option identifer */
  id: number;
  /** The text value of the option */
  text: string;
}

/**
 * Object with a current value of a select
 */
interface IValue {
  /** Identifier for value. It's further place in the query parameters.*/
  id: number;
  /** Text displayed on the screen */
  text: string;
}

export interface SelectProps {
  /** List of options. Is displayed when you click on a select */
  optionsList: IOption[];
  /** Current value of the select */
  value: IValue;
  /** Is used to update the state of a redux settings slice */
  changeHandler: (option: any) => void;
  /** Is passed to a select component. Manages where to display options list */
  displayTop?: boolean;
}
