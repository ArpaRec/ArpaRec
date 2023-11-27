/** Element of a list of difficulties */
export interface DifficultiesOption {
  /** Identifier for React keys */
  id: number;
  /** Value passed to API query parameters */
  value: null | string;
  /** Text value displayed on screen */
  text: string;
}

export const difficultiesList: DifficultiesOption[] = [
  {
    id: 1,
    value: null,
    text: "Any",
  },
  {
    id: 2,
    value: "easy",
    text: "Easy",
  },
  {
    id: 3,
    value: "medium",
    text: "Medium",
  },
  {
    id: 4,
    value: "hard",
    text: "Hard",
  },
];
