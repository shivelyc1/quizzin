import {
  type TokenApiCommand,
  type TokenResult,
  type TokenApiResponse,
  responseTypes,
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
): Promise<TokenResult> {
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

export type CategoryApiResponse = {
  trivia_categories: {
    id: number;
    name: string;
  }[];
};

export type CategoryResult =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: CategoryApiResponse;
    };

export async function requestCategories(): Promise<CategoryResult> {
  try {
    const response = await fetch(`${baseUrl}/api_category.php`);

    if (!response.ok) {
      return {
        success: false,
        error: "Http error",
      };
    }

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

export async function requestCategoryCount(categoryId: number): Promise<void> {}
