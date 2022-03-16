import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import DishCard from "../../components/DishCard/DishCard";

const Dishs = () => {
  const [dishs, setDishs] = useState(null);

  // get dishs
  async function getAllDishs() {
    const result = await axios.get("/api/dish/getDishs");
    setDishs(result.data);
  }

  useEffect(() => {
    getAllDishs();
  }, []);

  return (
    <>
      {dishs ? (
        <>
          {dishs.map((dish) => (
            <DishCard key={dish.id} dish={dish}/>
          ))}
        </>
      ) : null}
    </>
  );
};

export default Dishs;
