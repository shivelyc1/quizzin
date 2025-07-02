import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { requestCategories } from "../../util/opentdb/api";
import type {
  CategoryApiItem,
  CategoryApiResponse,
  OpenTDBResult,
} from "../../util/opentdb/domain";

const difficulties = ["easy", "medium", "hard"] as const;
type Difficulty = typeof difficulties;

// User is looking to select the category and difficulty
export default function StartScreen() {
  const [error, setError] = useState<string>("");

  // Categories
  const [categories, setCategories] = useState<CategoryApiItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  useEffect(() => {
    const getCategories = async () => {
      const result: OpenTDBResult<CategoryApiResponse> =
        await requestCategories();

      if (!result.success) {
        setError(result.error);
        return;
      }

      setCategories(result.data.trivia_categories);
    };

    getCategories();
  }, []);

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

      {error ? <p>{error}</p> : null}

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
          {categories.map((category, i) => (
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
