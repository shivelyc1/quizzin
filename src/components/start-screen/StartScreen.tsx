import { useEffect, useState, type FormEvent } from "react";
import { requestCategories, type CategoryResult } from "../../util/opentdb/api";

const difficulties = ["easy", "medium", "hard"] as const;
type Difficulty = typeof difficulties;

// User is looking to select the category and difficulty
export function StartScreen() {
  const [error, setError] = useState<string>("");
  // Categories
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {}, []);

  const onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const result = await requestCategories();

    console.log(result);
  };

  return (
    <div>
      <h1>Quizzin</h1>

      {error ? <p>{error}</p> : null}

      <form onSubmit={onSubmit}>
        <label htmlFor="category">Category</label>
        <select id="category" name="category">
          {categories.map((category, i) => (
            <option key={category + i} value={category}>
              {category}
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
