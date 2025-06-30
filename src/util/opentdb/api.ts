import {
  type TokenApiCommand,
  type TokenApiResponse,
  responseTypes,
  type CategoryApiResponse,
  type OpenTDBResult,
} from "./domain";
/* type OpenTDbResource =
  | "api"
  | "api_token"
  | "api_category"
  | "api_count"
  | "api_count_global";

// type ResponseCodeType = typeof responseTypes;
 
  */

const baseUrl = "https://opentdb.com" as const;

/**
 * Request a token from Open Trivia Database
 * @param command - token command
 * @param token - only required with `reset` command
 */
export async function requestToken(
  command: TokenApiCommand,
  token?: string
): Promise<OpenTDBResult<TokenApiResponse>> {
  if (!command) {
    return {
      success: false,
      error: "Command is null or empty",
    };
  } else if (command === "reset" && !token) {
    return {
      success: false,
      error: "Command reset requires a `token`",
    };
  }

  try {
    const response = await fetch(
      `${baseUrl}/api_token.php?command=${command}${
        token ? "&token=" + token : ""
      }`
    );

    if (!response.ok) {
      return {
        success: false,
        error: `Http error: ${response.status}`,
      };
    }

    // TODO do not typecast a response because you don't know what is going to be returned.
    const data = (await response.json()) as TokenApiResponse;

    if (data.response_code !== 0) {
      return {
        success: false,
        error: `API Error: ${responseTypes[data.response_code]}`,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: unknown) {
    console.log(err);
    return {
      success: false,
      error: `An unknown error occurred!`,
    };
  }
}

export async function requestCategories(): Promise<
  OpenTDBResult<CategoryApiResponse>
> {
  try {
    const response = await fetch(`${baseUrl}/api_category.php`);

    if (!response.ok) {
      return {
        success: false,
        error: "Http error",
      };
    }

    // TODO do not typecast a response because you don't know what is going to be returned.
    //
    const data = (await response.json()) as CategoryApiResponse;

    if (!data?.trivia_categories) {
      return {
        success: false,
        error: "Api error: failed to fetch categories",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: "Unknown error",
    };
  }
}

export type CategoryCountApiResponse = {
  category_id: number;
  category_question_count: {
    total_easy_question_count: number;
    total_medium_question_count: number;
    total_hard_question_count: number;
    total_question_count: number;
  };
};

export type CategoryCountResult =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: CategoryCountApiResponse;
    };

export async function requestCategoryCount(
  categoryId: number
): Promise<OpenTDBResult<CategoryCountApiResponse>> {
  try {
    // validate the value exists
    // 0 is falsy, but we should make sure it's not undefined
    if (typeof categoryId !== "number") {
      return {
        success: false,
        error: "CategoryId is null or empty",
      };
    }

    const response = await fetch(
      `${baseUrl}/api_count.php?category=${categoryId}`
    );

    if (!response.ok) {
      return {
        success: false,
        error: "Api Error",
      };
    }

    // TODO do not typecast a response because you don't know what is going to be returned.
    const data = (await response.json()) as CategoryCountApiResponse;

    // How to check if the data returned is what we expected?
    // Look input making a function checking for specific keys.

    return {
      success: true,
      data,
    };
  } catch (err: unknown) {
    console.log(err);
    return {
      success: false,
      error: "An unknown error occurred",
    };
  }
}
