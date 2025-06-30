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
  trivia_categories: {
    id: number;
    name: string;
  }[];
};
function TestingATheory() {}
