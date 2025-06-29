import { useEffect, useState } from "react"


const difficulties = ["easy", "medium", "hard"] as const;
type Difficulty = typeof difficulties;

type Form = {
  category: "",
  difficulty: Difficulty
}

// User is looking to select the category and difficulty
export function StartScreen()
{

  // Categories
  const [categories, setCategories] = useState<string[]>([])

  // Difficulty
  //

  
  // Fetch Categories
  useEffect(() => {
    const getCategories = async () => {
      try {
      }
      catch {

      }
    }
  }, [])


  return (
    <div>
      
      <h1>Quizzin</h1>

      <form onSubmit={(e) => {e.preventDefault(); console.log(e)}}>
        <label htmlFor="category">Category</label>
        {/* // TODO Use Selectable Type */}
        <select id="category" name="category">
          {
            categories.map((category, i) => (
              <option key={category + i} value={category}>
                {category}
              </option>
            ))
          }
        </select>

        <label htmlFor="difficulty">Difficulty</label>
        {/* // TODO Use <Options></Options> or <Dropdown></Dropdown> */}
        <select id="difficulty" name="difficulty">
          {
            difficulties.map((difficulty, i) => (
              <option key={i} value={difficulty}>{difficulty}</option>
            ))
          }
        </select>
        
        <button type="submit">Start</button>
      </form>

    </div>
  )
}