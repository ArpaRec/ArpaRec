/** Format of question returned from API */
export interface IQuestionFromAPI {
  /** Question category. E.g. "Anime" */
  category: string;
  /** Question type. E.g. "true / false" */
  type: string;
  /** Question difficulty. E.g. "Hard" */
  difficulty: string;
  /** Text of the question */
  question: string;
  /** Text of correct answer */
  correct_answer: string;
  /** List of incorrect answers */
  incorrect_answers: string[];
}

export interface IResultFromAPI {
  /**
   * The API appends a "Response Code" to each API Call to help tell developers what the API is doing.
   *
   * Code `0`: Success Returned results successfully.
   *
   * Code `1`: No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
   *
   * Code `2`: Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)
   *
   * Code `3`: Token Not Found Session Token does not exist.
   *
   * Code `4`: Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.
   */
  response_code: number;
  /** List of returned questions */
  results: IQuestionFromAPI[];
}

export interface IQueryParams {
  /** Number of questions */
  questionsNumber: number;
  /** Questions category */
  category: string | null;
  /** Questions difficulty */
  difficulty: string | null;
  /** Question type */
  type: string | null;
}
