import type { IQuestionFromAPI, IResultFromAPI, IQueryParams } from "./api.types";
import type { IQuestion, IOption } from "../questions/questionsSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API Documentation
// https://opentdb.com/api_config.php

// https://javascript.plainenglish.io/here-are-2-javascript-approaches-to-encode-decode-html-entities-52989bb12031
function decodeHTMLEntities(text: string): string {
  let textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://opentdb.com/api.php",
  }),
  keepUnusedDataFor: 0,
  endpoints(builder) {
    return {
      fetchQuestions: builder.query<any[], IQueryParams>({
        query: ({ questionsNumber, category, difficulty, type }) => {
          const questionsNumberQuery: string = `amount=${questionsNumber}`;
          const categoryQuery: string = category === null ? "" : `&category=${category}`;
          const difficultyQuery: string = difficulty === null ? "" : `&difficulty=${difficulty}`;
          const typeQuery: string = type === null ? "" : `&type=${type}`;
          const queryString =
            "/?" + questionsNumberQuery + categoryQuery + difficultyQuery + typeQuery;
          return queryString;
        },
        transformResponse(response: IResultFromAPI): IQuestion[] {
          const results: IQuestionFromAPI[] = response.results;
          const returnRes: IQuestion[] = results.map(
            (question: IQuestionFromAPI, index: number) => {
              const decodedIncorrectOptions = question.incorrect_answers.map((item) =>
                decodeHTMLEntities(item)
              );
              const options: IOption[] = [
                decodeHTMLEntities(question.correct_answer),
                ...decodedIncorrectOptions,
              ]
                .sort()
                .reverse()
                .map((item, index) => ({
                  optionID: index + 1,
                  optionText: item,
                }));

              const correctOptionID = options.filter(
                (item) => item.optionText === decodeHTMLEntities(question.correct_answer)
              )[0].optionID;

              return {
                questionID: index + 1,
                question: decodeHTMLEntities(question.question),
                category: question.category,
                difficulty: question.difficulty,
                selectedOptionID: null,
                correctOptionID: correctOptionID,
                options: options,
              };
            }
          );
          return returnRes;
        },
      }),
    };
  },
});

export const { useFetchQuestionsQuery } = apiSlice;
