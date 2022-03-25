import React from "react";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import classes from "./EditRecipesIngredients.module.css";
import Button from "../../Button";
import { useNotifications } from "@mantine/notifications";
import AddRecipesIngredients from "../../addRecipe/addRecipesIngredients";

// set basic value + s'assurer que c'est le bon state (on a besoin de l'ID)
// delete 
// create
// test global

const EditRecipeIngredients = ({ recipe, ingredients, units }) => {
  const notifications = useNotifications();
  const formRef = useRef();
  const token = Cookies.get("token");
  const [submitted, setSubmitted] = useState(false);

  console.log("data entrantes")
  console.log(recipe)

  async function editRecipeIngredient(params) {
    const { addIngredient, addUnit, addQuantity } = formRef.current;
    const ingredient = addIngredient.value;
    const quantity = addQuantity.value;
    const unit = addUnit.value;
    // if (!quantity || !unit || !ingredient) {
    //   notifications.showNotification({
    //     title: "Erreur dans votre formulaire !",
    //     message: "Un ou plusieurs éléments sont manquants",
    //     color: "red",
    //   });
    // } else {
    console.log("form")
    console.log(ingredient);


      //delete
      //create
      // await axios.put(
      //   "/api/recipe/editRecipe",
      //   {
      //     id: recipe.id,
      //     ingredientsUnit: {
      //       create: [
      //         {
      //           ingredientId: parseInt(ingredient),
      //           unitId: parseInt(unit),
      //           quantity: parseInt(quantity),
      //         },
      //       ],
      //     },
      //   },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      setSubmitted(true);
    }
  // }

  console.log(recipe.ingredientsUnit[0].ingredient.name);
  return (
    <>
      <div className={classes.block}>
        <form ref={formRef} className="row">
          <div className="col-3">
            <label className={classes.label}>
              {recipe.ingredientsUnit.quantity}
            </label>
            <input className={classes.input} name="addQuantity" type="text" />
          </div>
          <div className="col-3">
            <label className={classes.label}>Unité</label>
            {/* {recipe.ingredientsUnit[0]?.unit.name} */}
            <select className={classes.select} name="addUnit">
              {units?.map((unit) => (
                <option value={unit.id} key={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label className={classes.label}>Ingrédient</label>
            <select
              className={classes.select}
              name="addIngredient"
              selected={recipe.ingredientsUnit[0].ingredient.name}
              // Warning: Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.

            >
              {ingredients?.map((ingredient) => (
                <option value={ingredient.id} key={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className={classes.button}>
          {submitted ? (
            <p>Modifié!</p>
          ) : (
            <Button
              label="Modifier"
              type="success"
              handleClick={() => editRecipeIngredient()}
              href="#"
            />
          )}
        </div>
      </div>
      <h4>Ajouter de nouveaux ingrédients</h4>
      <AddRecipesIngredients
        recipe={recipe}
        units={units}
        ingredients={ingredients}
      />
    </>
  );
};

export default EditRecipeIngredients;
