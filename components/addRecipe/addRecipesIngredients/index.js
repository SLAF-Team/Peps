import React from "react";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import classes from './AddRecipesIngredients.module.css'
import Button from "../../Button";

const AddRecipesIngredients = ({ recipe, ingredients, units }) => {
  const formRef = useRef();
  const token = Cookies.get("token");
  const [submitted, setSubmitted] = useState(false);

  async function addRecipeIngredients(params) {
    const { addIngredient, addUnit, addQuantity } = formRef.current;
    const ingredient = addIngredient.value;
    const quantity = addQuantity.value;
    const unit = addUnit.value;
    await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        ingredientsUnit: {
          create: [
            {
              ingredientId: parseInt(ingredient),
              unitId: parseInt(unit),
              quantity: parseInt(quantity),
            },
          ],
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSubmitted(true);
  }

  return (
    <div>
      <form className={classes.form} ref={formRef}>
        <div className={classes.setups_small}>
          <div className={classes.setup_small}>
            <label>Quantité</label>
            <input
              className={classes.input_small}
              name="addQuantity"
              type="text"
            />
          </div>
          {units ? (
            <div className={classes.setup_small}>
              <label>Unité</label>
              <select className={classes.input_small} name="addUnit">
                {units.map((unit) => (
                  <option value={unit.id} key={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
        {ingredients ? (
          <div className={classes.setup_large}>
            <label>Ingrédient</label>
            <select className={classes.input_large} name="addIngredient">
              {ingredients.map((ingredient) => (
                <option value={ingredient.id} key={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className={classes.button}>
          {submitted ? (
            <p>Ajouté!</p>
          ) : (
            <Button
              label="Valider mon ingrédient"
              type="success"
              handleClick={() => addRecipeIngredients()}
              href=""
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddRecipesIngredients;
