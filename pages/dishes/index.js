import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import DishCard from "../../components/DishCard/DishCard";

const Dishes = () => {
  const [dishes, setDishes] = useState(null);

  // get dishes
  async function getAllDishes() {
    const result = await axios.get("/api/dish/getDishes");
    setDishes(result.data);
  }

  useEffect(() => {
    getAllDishes();
  }, []);

  return (
    <>
      {dishes?.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </>
  );
};

export default Dishes;
