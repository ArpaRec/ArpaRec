/** Element of a list of categories */
export interface CategoryOption {
  /** Identifier for React keys */
  id: number;
  /** Value passed to API query parameters */
  value: null | string;
  /** Text value displayed on screen */
  text: string;
}

export const categoriesList: CategoryOption[] = [
  {
    id: 1,
    value: null,
    text: "Any",
  },
  {
    id: 2,
    value: "9",
    text: "General Knowledge",
  },
  {
    id: 3,
    value: "10",
    text: "Entertainment: Books",
  },
  {
    id: 4,
    value: "11",
    text: "Entertainment: Film",
  },
  {
    id: 5,
    value: "12",
    text: "Entertainment: Music",
  },
  {
    id: 6,
    value: "13",
    text: "Entertainment: Musicals & Theatres",
  },
  {
    id: 7,
    value: "14",
    text: "Entertainment: Television",
  },
  {
    id: 8,
    value: "15",
    text: "Entertainment: Video Games",
  },
  {
    id: 9,
    value: "16",
    text: "Entertainment: Board Games",
  },
  {
    id: 10,
    value: "17",
    text: "Science & Nature",
  },
  {
    id: 11,
    value: "18",
    text: "Science: Computers",
  },
  {
    id: 12,
    value: "19",
    text: "Science: Mathematics",
  },
  {
    id: 13,
    value: "20",
    text: "Mythology",
  },
  {
    id: 14,
    value: "21",
    text: "Sports",
  },
  {
    id: 15,
    value: "22",
    text: "Geography",
  },
  {
    id: 16,
    value: "23",
    text: "History",
  },
  {
    id: 17,
    value: "24",
    text: "Politics",
  },
  {
    id: 18,
    value: "25",
    text: "Art",
  },
  {
    id: 19,
    value: "26",
    text: "Celebrities",
  },
  {
    id: 20,
    value: "27",
    text: "Animals",
  },
  {
    id: 21,
    value: "28",
    text: "Vehicles",
  },
  {
    id: 22,
    value: "29",
    text: "Entertainment: Comics",
  },
  {
    id: 23,
    value: "30",
    text: "Science: Gadgets",
  },
  {
    id: 24,
    value: "31",
    text: "Entertainment: Japanese Anime & Manga",
  },
  {
    id: 25,
    value: "32",
    text: "Entertainment: Cartoon & Animations",
  },
];
