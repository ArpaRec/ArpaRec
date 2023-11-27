/** Element of a list of types */
export interface TypeOption {
  /** Identifier for React keys */
  id: number;
  /** Value passed to API query parameters */
  value: null | string;
  /** Text value displayed on screen */
  text: string;
}

export const typesList: TypeOption[] = [
  {
    id: 1,
    value: null,
    text: "Any",
  },
  {
    id: 2,
    value: "multiple",
    text: "Multiple Choice",
  },
  {
    id: 3,
    value: "boolean",
    text: "True / False",
  },
];
