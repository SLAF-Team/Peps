import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import axios from "axios";
import Cookies from "js-cookie";

const AddRecipesIngredients = ({ recipe }) => {
  const formRef = useRef();
  const token = Cookies.get("token");
  const [disable, setDisable] = useState(false);
  const [ingredients, setIngredients] = useState(null);
  const [units, setUnits] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getAllIngredients();
    getAllUnits();
  }, []);

  // get regions
  async function getAllIngredients() {
    const result = await axios.get("/api/ingredient/getIngredients");
    setIngredients(result.data);
  }

  // get unit
  async function getAllUnits() {
    const result = await axios.get("/api/unit/getUnits");
    setUnits(result.data);
  }

  // add Incredient / Quantities / Recipe
  async function addRecipeIngredients(params) {
    setDisable(true);
    console.log("recette from ingredient")
    console.log(recipe)

    const { addIngredient, addUnit, addQuantity } = formRef.current;
    const ingredient = addIngredient.value;
    const quantity = addQuantity.value;
    const unit = addUnit.value;
    const result = await axios.post(
      "/api/ingredientsandrecipes/addIngredientsAndRecipes",
      {
        ingredientId: parseInt(ingredient),
        unitId: parseInt(unit),
        quantity: parseInt(quantity),
        recipeID: recipe.id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDisable(false);
    console.log(result)
  }

  // la query : il s'agit d'une update de recipe !!!

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