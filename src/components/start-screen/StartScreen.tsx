import { useState, type FormEvent, type ChangeEvent } from "react";
import type {
  CategoryApiResponse,
  OpenTDBResult,
} from "../../util/opentdb/domain";
import { useLoaderData } from "react-router-dom";

const difficulties = ["easy", "medium", "hard"] as const;
type Difficulty = typeof difficulties;

// User is looking to select the category and difficulty
export default function StartScreen() {
  const data = useLoaderData<OpenTDBResult<CategoryApiResponse>>();

  // Categories
  const [selectedCategory, setSelectedCategory] = useState<number>();

  const onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    // Next Page
  };

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (!value.match(/\d/)) {
      return;
    }

    setSelectedCategory(Number(value));
  };

  return (
    <div>
      <h1>Quizzin</h1>

      {!data.success ? <p>{data.error}</p> : null}

      <form onSubmit={onSubmit}>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={onChangeCategory}
        >
          <option key={0} value={-1}>
            All
          </option>
          {data.success &&
            data.data.trivia_categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>

        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" name="difficulty">
          {difficulties.map((difficulty, i) => (
            <option key={i} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>

        <button type="submit">Start</button>
      </form>
    </div>
  );
}
