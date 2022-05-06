import React from "react";
import classes from './Ingredients.module.css'
import Link from "next/link";

const Ingredients = ({recipe, personsValue}) => {

  const personsRatio = personsValue / recipe?.persons;

  return (
    <div>
      <ul className={classes.ul}>
        {recipe?.ingredientsUnit &&
          recipe?.ingredientsUnit.map((element, index) => (
            <li className={classes.li} key={index}>
              <Link href={"/recipes?ingredient=" + element.ingredient.id}>
                {Math.round(10 * personsRatio * element.quantity) / 10 +
                  " " +
                  element.unit.name +
                  " de " +
                  element.ingredient.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Ingredients;
