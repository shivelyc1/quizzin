export const responseTypes = [
  "success",
  "no_results",
  "invalid_parameter",
  "token_not_found",
  "token_empty",
  "rate_limit",
] as const;
export type TokenApiCommand = "request" | "reset";

// Missing response_message because 'reset' return only the response_code and token
export type TokenApiResponse = {
  response_code: number;
  token: string;
};

export type OpenTDBResult<T> =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: T;
    };

export type CategoryApiResponse = {
  trivia_categories: CategoryApiItem[];
};

export type CategoryCountApiResponse = {
  category_id: number;
  category_question_count: {
    total_easy_question_count: number;
    total_medium_question_count: number;
    total_hard_question_count: number;
    total_question_count: number;
  };
};

export type CategoryApiItem = {
  id: number;
  name: string;
};
