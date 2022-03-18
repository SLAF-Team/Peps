import { useState, useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../../context/UserContext";
import AddRecipesIngredients from "../../../components/addRecipe/addRecipesIngredients";
import AddRecipesTags from "../../../components/addRecipe/addRecipesTags";
import AddRecipesSteps from "../../../components/addRecipe/addRecipesSteps";
import { Checkbox } from "@mantine/core";
import classes from "./Recipe.module.css";
import prisma from "../../../lib/prisma.ts";

const newRecipe = ({ countries, types, dishes }) => {
  const formRef = useRef();
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [disable, setDisable] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [checked, setChecked] = useState(false);
  const [count, setCount] = useState(0);

  // add Recipe
  async function addNewRecipe(params) {
    setDisable(true);
    const {
      addName,
      addDescription,
      addCountry,
      addDish,
      addType,
      addImageUrl,
    } = formRef.current;
    const name = addName.value;
    const description = addDescription.value;
    const imageUrl = addImageUrl.value;
    const country = addCountry.value;
    const dish = addDish.value;
    const type = addType.value;
    const cook = user;
    const result = await axios.post(
      "/api/recipe/addRecipe",
      {
        name,
        description,
        imageUrl,
        countryId: parseInt(country),
        cookId: parseInt(cook.id),
        dishId: parseInt(dish),
        typeId: parseInt(type),
        published: checked,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDisable(false);
    setRecipe(result.data);
  }

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className={classes.main}>
      <div className={classes.maintitle}>
        <h2>1ère étape : ajoute ta recette ! </h2>
      </div>
      <form ref={formRef} className={classes.recipeform}>
        <div className={classes.toggle}>
          <p>Privée</p>
          <p>Publique</p>
        </div>
        <Checkbox
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
          label="Publier ma recette?"
        />
        {dishes ? (
          <div className={classes.dropdown}>
            <label>Plat relié</label>
            <select name="addDish">
              {dishes.map((dish) => (
                <option value={dish.id} key={dish.id}>
                  {dish.title}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className={classes.field}>
          <label>Nom de la recette</label>
          <input name="addName" type="text" />
        </div>
        <div className={classes.photo}>
          <label>Ajouter une photo</label>
          <input name="addImageUrl" type="text" />
        </div>
        {countries ? (
          <div className={classes.field}>
            <label>Pays</label>
            <select name="addCountry">
              {countries.map((country) => (
                <option value={country.id} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {types ? (
          <div className={classes.dropdown}>
            <label>Type de plat</label>
            <select name="addType">
              {types.map((type) => (
                <option value={type.id} key={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className={classes.field}>
          <label>Tags à faire</label>
        </div>
        <div className={classes.field}>
          <label>Description</label>
          <input name="addDescription" type="text" />
        </div>
        <button
          disabled={disable}
          className="btn btn-primary my-3"
          onClick={() => addNewRecipe()}
        >
          Créer un plat
        </button>
      </form>
      <div className={classes.ingredientform}>
        <h2>II - Ajoute tes ingrédients</h2>
        {/* {recipe ? <> */}
        {[...Array(count)].map((e, i) => {
          return <AddRecipesIngredients recipe={recipe} key={i} />;
        })}
        {/* </> : null} */}
        <button onClick={handleClick}>Ajouter un ingrédient</button>
      </div>
      <div className={classes.stepsform}>
        <h2>III - Décris les étapes de ta recette</h2>
        {/* {recipe ? */}
        <AddRecipesSteps recipe={recipe} />
        {/* // : null} */}
        <h2>IV - Un peu de référencement...</h2>
        {/* {recipe ? <AddRecipesTags /> : null} */}
        <AddRecipesTags recipe={recipe} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const allTypes = await prisma.type.findMany();
  const allCountries = await prisma.country.findMany();
  const allDishes = await prisma.dish.findMany();
  return {
    props: {
      dishes: allDishes,
      types: allTypes,
      countries: allCountries,
    },
  };
}

export default newRecipe;
