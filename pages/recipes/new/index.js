import { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../../context/UserContext";
import AddRecipesIngredients from "../../../components/addRecipe/addRecipesIngredients";
import AddRecipesTags from "../../../components/addRecipe/addRecipesTags";
import AddRecipesSteps from "../../../components/addRecipe/addRecipesSteps";
import prisma from "../../../lib/prisma.ts";
import Button from "../../../components/Button";
import classes from "./Recipe.module.css";
import Selector from "../../../components/Selector";

const newRecipe = ({ countries, types, dishes, tags, ingredients, units }) => {
  const formRef = useRef();
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [recipe, setRecipe] = useState(null);
  const [checked, setChecked] = useState(false);
  const [style, setStyle] = useState(false);
  const [count, setCount] = useState(1);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleClickRight = () => {
    setChecked(true);
    setStyle(true);
  };

  const handleClickLeft = () => {
    setChecked(false);
    setStyle(false);
  };

  // add Recipe
  async function addNewRecipe(params) {
    const {
      addName,
      addDescription,
      addCountry,
      addDish,
      addType,
      addImageUrl,
      addPersons,
    } = formRef.current;
    const name = addName.value;
    const description = addDescription.value;
    const imageUrl = addImageUrl.value;
    const country = addCountry.value;
    const dish = addDish.value;
    const type = addType.value;
    const cook = user;
    const persons = addPersons.value;
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
        persons: parseInt(persons),
        published: JSON.parse(checked),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(result.data)
    setSubmitted(true);
    setRecipe(result.data);
    setStep(step + 1);
  }

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleStepClick = () => {
    setStep(step + 1);
  }

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Ajouter une recette</h1>
      {step === 0 && (
        <>
          <Selector
            left="PRIVÉE"
            right="PUBLIQUE"
            handleClickRight={handleClickRight}
            handleClickLeft={handleClickLeft}
            style={style}
          />
          <form ref={formRef} className={classes.recipeform}>
            {dishes ? (
              <div className={classes.step}>
                <label className={classes.label}>Plat associé</label>
                <select className={classes.select} name="addDish">
                  <option value="" selected disabled>
                    Choisissez le plat associé
                  </option>
                  {dishes.map((dish) => (
                    <option value={dish.id} key={dish.id}>
                      {dish.title}
                    </option>
                  ))}
                </select>
                <Button
                  label="Créer un plat"
                  type="primary"
                  href="/dishes/new"
                />
              </div>
            ) : null}
            <div className={classes.step}>
              <label className={classes.label}>Nom de la recette</label>
              <input
                className={classes.input}
                name="addName"
                type="text"
                placeholder="Ex: Tarte aux pommes de ma grand mère"
              />
            </div>
            <div className={classes.step}>
              <label className={classes.label}>Ajouter une photo</label>
              <input
                className={classes.input}
                name="addImageUrl"
                type="text"
                placeholder="Ex: https://masuperimagedetarte.com"
              />
            </div>
            <div className={classes.step}>
              <label className={classes.label}>Nombre de convives</label>
              <input
                className={classes.input}
                type="number"
                name="addPersons"
                min="1"
                max="15"
              />
            </div>

            {countries ? (
              <div className={classes.step}>
                <label className={classes.label}>Pays</label>
                <select className={classes.select} name="addCountry">
                  <option value="" selected disabled>
                    Choisissez un pays
                  </option>
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
                <label className={classes.label}>Type de plat</label>
                <select className={classes.select} name="addType">
                  <option value="" selected disabled>
                    Choisissez le type de plat
                  </option>
                  {types.map((type) => (
                    <option value={type.id} key={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div className={classes.step}>
              <label className={classes.label}>Description</label>
              <input
                className={classes.input}
                name="addDescription"
                type="text"
                placeholder="Ex: Ma recette familiale de tarte aux abricots et amandes et sa pâte sablée"
              />
            </div>
            <div className={classes.button}>
              <Button
                label="Créer ma recette"
                type="primary"
                handleClick={() => addNewRecipe()}
                href="#"
              />
            </div>
          </form>
        </>
      )}
      {step === 1 && (
        <>
          <div className={classes.selector}>
            <div className="selectorBlock">
              <p className={classes.selectorText}>AJOUTER DES INGRÉDIENTS</p>
            </div>
          </div>
          <div className={classes.ingredientform}>
            {recipe ? (
              <>
                {[...Array(count)].map((e, i) => {
                  return (
                    <AddRecipesIngredients
                      recipe={recipe}
                      key={i}
                      ingredients={ingredients}
                      units={units}
                    />
                  );
                })}
              </>
            ) : null}
            <div className={classes.button}>
              <Button
                label="Nouvel ingrédient"
                type="primary"
                handleClick={handleClick}
                href="#"
              />
            </div>
          </div>
          <div className={classes.selector}>
            <div className="selectorBlock">
              <p className={classes.selectorText}>ÉTAPES DE LA RECETTE</p>
            </div>
          </div>
          <div className={classes.stepsform}>
            {recipe ? <AddRecipesSteps recipe={recipe} /> : null}
          </div>
          <Button
            label="Je passe à l'étape suivante ! "
            type="primary"
            href="#"
            handleClick={() => handleStepClick()}
          />
        </>
      )}

      {step === 2 && (
        <>
          <div className={classes.selector}>
            <div className="selectorBlock">
              <p className={classes.selectorText}>AJOUTER DES TAGS</p>
            </div>
          </div>
          <div className={classes.stepsform}>
            <AddRecipesTags recipe={recipe} tags={tags} />
          </div>
          <Button
            label="J'ai fini ! "
            type="success"
            href={`/recipes/${recipe?.id}`}
          />
        </>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const allTypes = await prisma.type.findMany();
  const allCountries = await prisma.country.findMany();
  const allDishes = await prisma.dish.findMany();
  const allIngredients = await prisma.ingredient.findMany();
  const allUnits = await prisma.unit.findMany();
  const allTags = await prisma.tag.findMany();
  return {
    props: {
      dishes: allDishes,
      types: allTypes,
      countries: allCountries,
      tags: allTags,
      ingredients: allIngredients,
      units: allUnits,
    },
  };
}

export default newRecipe;
