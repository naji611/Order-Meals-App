import { useEffect, useState } from "react";

import Meal from "./Meal";
export default function Meals() {
  let [meals, setMeals] = useState();
  let [loading, setLoading] = useState();
  let [error, setError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/meals");
        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.message);
        }
        setLoading(false);
        setMeals(resData);
      } catch (error) {
        setLoading(false);
        setError(resData.message || { message: "Cant fetch meals!" });
      }
    };

    fetchMeals();
  }, []);
  return (
    <section>
      {error && <h2>{error.message}</h2>}
      {loading && !error && <h1 className="center">Loading...</h1>}
      {meals && (
        <ul id="meals">
          {meals.map((meal) => (
            <Meal
              meal={meal}
              key={meal.id}
              image={meal.image}
              id={meal.id}
              name={meal.name}
              price={meal.price}
              description={meal.description}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
