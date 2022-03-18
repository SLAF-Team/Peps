import React from "react";
import { useState } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import axios from "axios";
import Cookies from "js-cookie";

const AddRecipesIngredients = ({ recipe, ingredients, units }) => {
  const formRef = useRef();
  const token = Cookies.get("token");
  const [disable, setDisable] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function addRecipeIngredients(params) {
    setDisable(true);
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
    setDisable(false);
  }

  return (
    <div>
      <form ref={formRef}>
        <div>
          <label>Quantité</label>
          <input name="addQuantity" type="text" />
        </div>
        {ingredients ? (
          <div>
            <label>Ingrédient</label>
            <select name="addIngredient">
              {ingredients.map((ingredient) => (
                <option value={ingredient.id} key={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {units ? (
          <div>
            <label>Unité</label>
            <select name="addUnit">
              {units.map((unit) => (
                <option value={unit.id} key={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {submitted ? (
          <p>Ajouté!</p>
        ) : (
          <button disabled={disable} onClick={() => addRecipeIngredients()}>
            Ajouter
          </button>
        )}
      </form>
    </div>
  );
};

export default AddRecipesIngredients;
