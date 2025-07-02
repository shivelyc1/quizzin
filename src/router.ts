import { createBrowserRouter } from "react-router-dom";
import StartScreen from "./components/start-screen/StartScreen";
import type { CategoryApiResponse, OpenTDBResult } from "./util/opentdb/domain";
import { requestCategories } from "./util/opentdb/api";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: StartScreen,
    loader: async () => {
      const result: OpenTDBResult<CategoryApiResponse> =
        await requestCategories();

      return result;
    },
  },
]);
