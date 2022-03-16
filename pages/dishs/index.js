import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";

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
            <h1 key={dish.id}>{dish.title}</h1>
            // <DishCard dish={dish}/>
          ))}
        </>
      ) : null}
    </>
  );
};

export default Dishs;
