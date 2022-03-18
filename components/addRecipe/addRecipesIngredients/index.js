import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import axios from "axios";
import Cookies from "js-cookie";
import classes from './AddRecipesIngredients.module.css'
import Button from "../../Button";

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
      <form className={classes.form} ref={formRef}>
        <div className={classes.setups_small}>
          <div className={classes.setup_small}>
            <label>Quantité</label>
            <input className={classes.input_small} name="addQuantity" type="text" />
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

        {submitted ? (
          <p>Ajouté!</p>
        ) : (
          <Button
            label='ajouter'
            type="primary"
            handleClick={() => addRecipeIngredients()}
            href=''
          />
        )}
      </form>
    </div>
  );
};

export default AddRecipesIngredients;
