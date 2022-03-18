import { useState, useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../../context/UserContext";
import AddRecipesIngredients from "../../../components/addRecipe/addRecipesIngredients";
import AddRecipesTags from "../../../components/addRecipe/addRecipesTags";
import AddRecipesSteps from "../../../components/addRecipe/addRecipesSteps";
import Button from "../../../components/Button";
import classes from "./Recipe.module.css";
import { SegmentedControl } from "@mantine/core";
import { Select } from "@mantine/core";

const newRecipe = () => {
  const formRef = useRef();
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [disable, setDisable] = useState(false);
  const [countries, setCountries] = useState(null);
  const [dishes, setDishes] = useState(null);
  const [types, setTypes] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [checked, setChecked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getAllCountries();
    getAllDishes();
    getAllTypes();
  }, []);

  // get regions
  async function getAllCountries() {
    const result = await axios.get("/api/country/getCountries");
    setCountries(result.data);
  }

  // get dish
  async function getAllDishes() {
    const result = await axios.get("/api/dish/getDishes");
    setDishes(result.data);
  }

  // get types
  async function getAllTypes() {
    const result = await axios.get("/api/type/getTypes");
    setTypes(result.data);
  }

  // add Dish
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
        published: JSON.parse(checked),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDisable(false);
    setRecipe(result.data);
    console.log(recipe);
  }

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className={classes.main}>
      <div className={classes.maintitle}>
        <h2 className={classes.h1}>Ajouter une recette</h2>
      </div>
      <form ref={formRef} className={classes.recipeform}>
        <SegmentedControl
          value={checked}
          onChange={setChecked}
          data={[
            { label: "Privée", value: "false" },
            { label: "Publique", value: "true" },
          ]}
        />
        {dishes ? (
          <div className={classes.step}>
            <label>Plat associé</label>
            <select className={classes.select} name="addDish">
              {dishes.map((dish) => (
                <option value={dish.id} key={dish.id}>
                  {dish.title}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className={classes.step}>
          <label>Nom de la recette</label>
          <input className={classes.input} name="addName" type="text" />
        </div>
        <div className={classes.step}>
          <label>Ajouter une photo</label>
          <input className={classes.input} name="addImageUrl" type="text" />
        </div>
        {countries ? (
          <div className={classes.step}>
            <label>Pays</label>
            <select className={classes.select} name="addCountry">
              {countries.map((country) => (
                <option value={country.id} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {types ? (
          <div className={classes.step}>
            <label>Type de plat</label>
            <select className={classes.select} name="addType">
              {types.map((type) => (
                <option value={type.id} key={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className={classes.step}>
          <label>Tags à faire</label>
        </div>
        <div className={classes.step}>
          <label>Description</label>
          <input className={classes.input} name="addDescription" type="text" />
        </div>
        {/* <Checkbox
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
          label="Publier ma recette?"
        /> */}
        <div className={classes.button}>
          <Button
            label="Créer un plat"
            disabled={disable}
            type="primary"
            handleClick={() => addNewRecipe()}
            href=""
          />
        </div>
      </form>
      <div className={classes.ingredientform}>
        <h2 className={classes.h2}>II - Ajoute tes ingrédients</h2>
        {recipe ? (
          <>
            {[...Array(count)].map((e, i) => {
              return <AddRecipesIngredients recipe={recipe} key={i} />;
            })}
          </>
        ) : null}
        <button onClick={handleClick}>Ajouter un ingrédient</button>
      </div>
      <div className={classes.stepsform}>
        <h2 className={classes.h2}>III - Décris les étapes de ta recette</h2>
        {recipe ? <AddRecipesSteps recipe={recipe} /> : null}
        <h2 className={classes.h2}>IV - Un peu de référencement...</h2>
        {recipe ? <AddRecipesTags /> : null}
        <AddRecipesTags recipe={recipe} />
      </div>
    </div>
  );
};

export default newRecipe;
