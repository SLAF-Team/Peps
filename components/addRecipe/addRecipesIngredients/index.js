import React from "react";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import classes from "./AddRecipesIngredients.module.css";
import Button from "../../Button";
import { useNotifications } from "@mantine/notifications";
import { Select } from "@mantine/core";

const AddRecipesIngredients = ({ recipe, ingredients, units }) => {
  const notifications = useNotifications();
  const formRef = useRef();
  const token = Cookies.get("token");
  const [submitted, setSubmitted] = useState(false);
  const [unitValue, setUnitValue] = useState("");
  const [ingredientValue, setIngredientValue] = useState("");

  const unitsData = [];
  units.map((element) =>
    unitsData.push({ value: element.id, label: element.name })
  );

  const ingredientsData = [];
  ingredients.map((element) =>
    ingredientsData.push({ value: element.id, label: element.name })
  );

  async function addRecipeIngredients(params) {
    const { addQuantity } = formRef.current;
    const ingredient = ingredientValue;
    const quantity = addQuantity.value;
    const unit = unitValue;
    if (!quantity || !unit || !ingredient) {
      notifications.showNotification({
        title: "Erreur dans votre formulaire !",
        message: "Un ou plusieurs éléments sont manquants",
        color: "red",
      });
    } else {
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
  }

  return (
    <>
      <div className={classes.block}>
        <form ref={formRef} className="row">
          <div className="col-3">
            <label className={classes.label}>Quantité (chiffre)</label>
            <input className={classes.input} name="addQuantity" type="text" />
          </div>
          <div className="col-3">
            <label className={classes.label}>Unité</label>
            {submitted ? (
              <Select
                value={unitValue}
                onChange={setUnitValue}
                placeholder="Choisissez une unité"
                data={unitsData}
                searchable
                nothingFound="Pas d'option"
                disabled
              />
            ) : (
              <Select
                value={unitValue}
                onChange={setUnitValue}
                placeholder="Choisissez une unité"
                data={unitsData}
                searchable
                nothingFound="Pas d'option"
              />
            )}
          </div>
          <div className="col-6">
            <label className={classes.label}>Ingrédient</label>
            {submitted ? (
              <Select
                value={ingredientValue}
                onChange={setIngredientValue}
                placeholder="Choisissez un ingrédient"
                data={ingredientsData}
                searchable
                disabled
                nothingFound="Pas d'option"
              />
            ) : (
              <Select
                value={ingredientValue}
                onChange={setIngredientValue}
                placeholder="Choisissez un ingrédient"
                data={ingredientsData}
                searchable
                nothingFound="Pas d'option"
              />
            )}
          </div>
        </form>
        <div className={classes.button}>
          {submitted ? (
            <p>Ajouté!</p>
          ) : (
            <Button
              label="Ajouter cet ingrédient"
              type="success"
              handleClick={() => addRecipeIngredients()}
              href="#"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddRecipesIngredients;
