import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import EditRecipesIngredients from "./editRecipesIngredients";
import EditRecipesStep from "./editRecipesSteps";
import EditRecipesTags from "./editRecipesTags";
import Button from "../Button";
import classes from "./Recipe.module.css";
import { useNotifications } from "@mantine/notifications";
import { Select, Stepper } from "@mantine/core";
import { useRouter } from "next/router";
import { Switch } from "@mantine/core";

const EditRecipe = ({
  user,
  recipe,
  countries,
  types,
  dishes,
  tags,
  ingredients,
  units,
}) => {
  const notifications = useNotifications();
  const formRef = useRef();
  const token = Cookies.get("token");
  const [count, setCount] = useState(1);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [countryValue, setCountryValue] = useState(recipe.countryId.toString());
  const [typeValue, setTypeValue] = useState(recipe.typeId.toString());
  const [dishValue, setDishValue] = useState(recipe.dishId.toString());
  const [personsValue, setPersonsValue] = useState(recipe.persons);
  const [nameValue, setNameValue] = useState(recipe.name);
  const [imageUrlValue, setImageUrlValue] = useState(recipe.imageUrl);
  const [checked, setChecked] = useState(recipe.published);
  const router = useRouter();
  const [editedRecipe, setEditedRecipe] = useState(recipe)

  useEffect(() => {
    if (recipe.cookId === user.id) {
      return;
    } else {
      notifications.showNotification({
        title: "Edition",
        message: "Vous n'avez pas les droit pour éditer cette recette",
        color: "red",
      });
      router.push(`/recipes/${recipe.id}`);
    }
  }, [user, recipe]);

  // async function deleteRecipe() {
  //   if (window.confirm("Souhaitez vous supprimer ce plat?")) {
  //     await axios.delete(`/api/recipe/delete/${recipe?.id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     router.push("/recipes/");
  //   }
  // }

  console.log(ingredients)
  
  const countriesData = [];
  countries.map((element) =>
    countriesData.push({ value: element.id.toString(), label: element.name })
  );
  const typesData = [];
  types.map((element) =>
    typesData.push({ value: element.id.toString(), label: element.name })
  );
  const dishesData = [];
  dishes.map((element) =>
    dishesData.push({ value: element.id.toString(), label: element.title })
  );

  const handleName = (e) => {
    setNameValue(e.target.value);
  };

  const handleImageUrl = (e) => {
    setImageUrlValue(e.target.value);
  };

  const handlePersons = (e) => {
    setPersonsValue(e.target.value);
  };

  // edit Recipe
  async function editRecipe() {
    const name = nameValue;
    const imageUrl = imageUrlValue;
    const country = countryValue;
    const dish = dishValue;
    const type = typeValue;
    const persons = personsValue;
    if (!name || !persons) {
      notifications.showNotification({
        title: "Erreur dans votre formulaire !",
        message: "Un ou plusieurs éléments sont manquants",
        color: "red",
      });
    } else {
      const result = await axios.put(
        "/api/recipe/editRecipe",
        {
          id: recipe.id,
          name,
          imageUrl,
          countryId: parseInt(country),
          dishId: parseInt(dish),
          typeId: parseInt(type),
          published: JSON.parse(checked),
          persons: parseInt(persons),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditedRecipe(result.data)
      setSubmitted(true);
      setStep(step + 1);
    }
  }

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleStepClick = () => {
    setStep(step + 1);
    setCount(1);
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Modifier ma recette</h1>
      <Stepper
        active={step}
        breakpoint="sm"
        size="xs"
        color="yellow"
        iconSize={32}
      >
        <Stepper.Step label="Ma recette"></Stepper.Step>
        <Stepper.Step label="Les ingrédients"></Stepper.Step>
        <Stepper.Step label="Les étapes"></Stepper.Step>
        <Stepper.Step label="Les tags"></Stepper.Step>
      </Stepper>
      {step === 1 && (
        <>
          <form ref={formRef} className={classes.recipeform}>
            <div className={classes.step}>
              <Switch
                onLabel="Publiée"
                offLabel="Privée"
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                size="lg"
              />
            </div>
            <div className={classes.step}>
              <label className={classes.label}>Plat associé</label>
              <Select
                value={dishValue}
                onChange={setDishValue}
                placeholder="Choisissez un plat"
                data={dishesData}
                searchable
                clearable
              />
            </div>
            <div className={classes.button}>
              <Button label="Nouveau plat" type="primary" href="/dishes/new" />
            </div>
            <div className={classes.step}>
              <label className={classes.label}>Nom de la recette *</label>
              <input
                className={classes.input}
                onChange={handleName}
                value={nameValue}
                type="text"
              />
            </div>
            <div className={classes.step}>
              <label className={classes.label}>Ajouter une photo</label>
              <input
                className={classes.input}
                onChange={handleImageUrl}
                value={imageUrlValue}
                type="text"
              />
            </div>
            <div className={classes.step}>
              <label className={classes.label}>Nombre de convives *</label>
              <input
                className={classes.input}
                onChange={handlePersons}
                value={personsValue}
                type="number"
                min="1"
                max="15"
              />
            </div>
            <div className={classes.step}>
              <label className={classes.label}>Pays</label>
              <Select
                value={countryValue}
                onChange={setCountryValue}
                placeholder="Choisissez un pays"
                data={countriesData}
                searchable
                clearable
              />
            </div>
            <div className={classes.step}>
              <label className={classes.label}>Type de plat</label>
              <Select
                value={typeValue}
                onChange={setTypeValue}
                placeholder="Choisissez un type"
                data={typesData}
                searchable
                clearable
              />
            </div>
            <div className={classes.button}>
              <Button
                label="Suivant"
                type="primary"
                handleClick={() => editRecipe()}
                href="#"
              />
            </div>
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <div className={classes.selector}>
            <div className="selectorBlock">
              <p className={classes.selectorText}>EDITER LES INGRÉDIENTS</p>
            </div>
          </div>
          <div className={classes.ingredientform}>
            {recipe ? (
              <>
                {[...Array(count)].map((e, i) => {
                  return (
                    <EditRecipesIngredients
                      recipe={editedRecipe}
                      onSubmit={setEditedRecipe}
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
            </div>{" "}
            <div className={classes.button}>
              <Button
                label="Suivant"
                type="primary"
                href="#"
                handleClick={() => handleStepClick()}
              />
            </div>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div className={classes.selector}>
            <div className="selectorBlock">
              <p className={classes.selectorText}>EDITER LES ETAPES</p>
            </div>
          </div>
          <div className={classes.ingredientform}>
            {recipe ? (
              <>
                {[...Array(count)].map((e, i) => {
                  return (
                    <EditRecipesStep
                      recipe={editedRecipe}
                      onSubmit={setEditedRecipe}
                      count={count}
                      key={i}
                    />
                  );
                })}
              </>
            ) : null}
            <div className={classes.button}>
              <Button
                label="Nouvelle étape"
                type="primary"
                handleClick={handleClick}
                href="#"
              />
            </div>
            <div className={classes.button}>
              <Button
                label="Suivant"
                type="primary"
                href="#"
                handleClick={() => handleStepClick()}
              />
            </div>
          </div>
        </>
      )}
      {step === 4 && (
        <>
          <div className={classes.selector}>
            <div className="selectorBlock">
              <p className={classes.selectorText}>EDITER LES TAGS</p>
            </div>
          </div>
          <div className={classes.ingredientform}>
            <EditRecipesTags
              recipe={editedRecipe}
              onSubmit={setEditedRecipe}
              tags={tags}
            />
            <div className={classes.button}>
              <Button
                label="J'ai fini !"
                type="success"
                href={`/recipes/${recipe?.id}`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditRecipe;
