import { IQuestion } from "./questionsSlice";

const initialStateData: IQuestion[] = [
  {
    questionID: 1,
    question: "How would one say goodbye in Spanish?",
    category: "Nature & Science",
    difficulty: "Medium difficulty",
    selectedOptionID: null,
    correctOptionID: 1,
    options: [
      {
        optionID: 1,
        optionText: "Adios",
      },
      {
        optionID: 2,
        optionText: "Hola",
      },
      {
        optionID: 3,
        optionText: "Au Revoir",
      },
      {
        optionID: 4,
        optionText: "Salir",
      },
    ],
  },
  {
    questionID: 2,
    question:
      "Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?",
    category: "Nature & Science",
    difficulty: "Easy difficulty",
    selectedOptionID: null,
    correctOptionID: 3,
    options: [
      {
        optionID: 1,
        optionText: "Cabbage Patch Kids",
      },
      {
        optionID: 2,
        optionText: "Transformers",
      },
      {
        optionID: 3,
        optionText: "Care Bears",
      },
      {
        optionID: 4,
        optionText: "Rubik's Cube",
      },
    ],
  },
  {
    questionID: 3,
    question: "What is the hottest planet in our Solar System?",
    category: "Nature & Science",
    difficulty: "Easy difficulty",
    selectedOptionID: null,
    correctOptionID: 2,
    options: [
      {
        optionID: 1,
        optionText: "Mercury",
      },
      {
        optionID: 2,
        optionText: "Venus",
      },
      {
        optionID: 3,
        optionText: "Mars",
      },
      {
        optionID: 4,
        optionText: "Saturn",
      },
    ],
  },
  {
    questionID: 4,
    question: "In which country was the caesar salad invented?",
    category: "Nature & Science",
    difficulty: "Easy difficulty",
    selectedOptionID: null,
    correctOptionID: 3,
    options: [
      {
        optionID: 1,
        optionText: "Italy",
      },
      {
        optionID: 2,
        optionText: "Portugal",
      },
      {
        optionID: 3,
        optionText: "Mexico",
      },
      {
        optionID: 4,
        optionText: "France",
      },
    ],
  },
  {
    questionID: 5,
    question: "In which country was the caesar salad invented?",
    category: "Nature & Science",
    difficulty: "Easy difficulty",
    selectedOptionID: null,
    correctOptionID: 3,
    options: [
      {
        optionID: 1,
        optionText: "Italy",
      },
      {
        optionID: 2,
        optionText: "Portugal",
      },
      {
        optionID: 3,
        optionText: "Mexico",
      },
      {
        optionID: 4,
        optionText: "France",
      },
    ],
  },
  {
    questionID: 6,
    question: "How Many Hearts Does An Octopus Have?",
    category: "Nature & Science",
    difficulty: "Easy difficulty",
    selectedOptionID: null,
    correctOptionID: 3,
    options: [
      {
        optionID: 1,
        optionText: "One",
      },
      {
        optionID: 2,
        optionText: "Two",
      },
      {
        optionID: 3,
        optionText: "Three",
      },
      {
        optionID: 4,
        optionText: "Four",
      },
    ],
  },
];

export default initialStateData;
