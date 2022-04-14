import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import classes from "./Recipe.module.css";
import ButtonSettings from "../../components/ButtonSettings";
import Button from "../../components/Button";
import ListForm from "../../components/List/ListForm";
import prisma from "../../lib/prisma.ts";
import EditRecipe from "../../components/EditRecipe";
import RecipeTitle from "../../components/RecipeTitle/RecipeTitle";
import Steps from "../../components/Steps/Steps";
import Tags from "../../components/Tags/Tags";
import RecipeSectionTitle from "../../components/RecipeSectionTitle/RecipeSectionTitle";
import Ingredients from "../../components/Ingredients/Ingredients";
import BCrumbs from "../../components/BCrumbs/BCrumbs";
import Comments from "../../components/Comments/Comments";
import { Modal, Tabs, Skeleton, NumberInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import Rating from "../../components/Rating";

const SelectedRecipe = ({
  ingredients,
  units,
  countries,
  types,
  dishes,
  tags,
  id,
}) => {
  const [recipe, setRecipe] = useState(null);
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const isPublic = recipe?.published;
  const isAuthor = recipe?.cookId == user?.id ? true : false;
  const [personsValue, setPersonsValue] = useState(0);
  const notifications = useNotifications();

  const getRecipe = async () => {
    if (!id) {
      return;
    }
    try {
      const result = await axios.get(`/api/recipe/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipe(result.data);
    } catch (err) {
      console.log("Error regarding the loading of recipes.");
    }
  };

  const getIngredients = async () => {
    if (!id) {
      return;
    }
    try {
      const result = await axios.get("/api/ingredient/getIngredients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIngredients(result.data);
    } catch (err) {
      console.log("Error regarding the loading of ingredients.");
    }
  };

  useEffect(() => {
    setPersonsValue(recipe?.persons);
  }, [recipe]);

  useEffect(() => {
    getRecipe();
    getIngredients();
  }, [id]);

  const handleCommentUpdate = () => {
    getRecipe();
  };

  const handleListCreate = () => {
    getRecipe();
  };

  const handleEditRecipe = () => {
    getRecipe();
    setOpened(false);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  async function deleteRecipe() {
    if (window.confirm("Souhaitez vous supprimer cette recette?")) {
      await axios.delete(`/api/recipe/delete/${recipe?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      notifications.showNotification({
        title: "C'est la fin des haricots",
        message: "Votre recette a bien été supprimée",
        color: "green",
      });
      router.push("/recipes/");
    }
  }

  if (!recipe) {
    return null;
  }
  if (!isPublic && !isAuthor) {
    return <p>Cette recette est privée !</p>;
  }

  return (
    <div className="row">
      <div className="col-9">
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <BCrumbs parent={"Recettes"} child={recipe.name} />
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <img src={recipe.imageUrl} className={classes.mainImage} />
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <RecipeTitle recipe={recipe} />
        </Skeleton>
        <div className={classes.resp}>
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <Tabs grow>
              <Tabs.Tab label="Ingrédients">
                <div className={classes.padding}>
                  <RecipeSectionTitle children="PERSONNES" />
                  <NumberInput
                    style={{ marginTop: 10 }}
                    value={personsValue}
                    onChange={(val) => setPersonsValue(val)}
                    required
                    min={1}
                    max={15}
                    size="xs"
                  />
                  <RecipeSectionTitle children="INGRÉDIENTS" />
                  <Ingredients recipe={recipe} personsValue={personsValue} />
                </div>
              </Tabs.Tab>
              <Tabs.Tab label="Étapes">
                <Steps recipe={recipe} container={classes.mobilecontainer} />
              </Tabs.Tab>
              <Tabs.Tab label="Tags et Listes">
                <div className={classes.padding}>
                  <RecipeSectionTitle children="TAGS" />
                  <Tags recipe={recipe} />
                </div>
                <div className={classes.padding}>
                  <RecipeSectionTitle children="LISTES" />
                  <div className={classes.detailscontainer}>
                    <ListForm
                      lists={recipe.lists}
                      recipe={recipe}
                      onCreate={handleListCreate}
                    />
                  </div>
                </div>
              </Tabs.Tab>
            </Tabs>
          </Skeleton>
        </div>
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <Steps recipe={recipe} container={classes.stepscontainer} />
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <Comments
            recipe={recipe}
            user={user}
            handleCommentUpdate={handleCommentUpdate}
          />
        </Skeleton>
      </div>
      <div className="col-3">
        <div className={classes.responsive}>
          {isAuthor ? (
            <>
              <div className={classes.button}>
                <ButtonSettings
                  label="Editer"
                  type="warning"
                  handleClick={() => setOpened(true)}
                  href="#"
                />
              </div>

              <div className={classes.button}>
                <Button
                  label="Supprimer"
                  type="danger"
                  handleClick={() => deleteRecipe()}
                  href="#"
                />
              </div>
            </>
          ) : null}
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.padding}>
              <RecipeSectionTitle children="PERSONNES" />
              <NumberInput
                style={{ marginTop: 10 }}
                value={personsValue}
                onChange={(val) => setPersonsValue(val)}
                required
                min={1}
                max={15}
                size="xs"
              />
              <RecipeSectionTitle children="INGRÉDIENTS" />
              <Ingredients recipe={recipe} personsValue={personsValue} />
            </div>
          </Skeleton>
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.padding}>
              <RecipeSectionTitle children="TAGS" />
              <Tags recipe={recipe} />
            </div>
          </Skeleton>
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.padding}>
              <RecipeSectionTitle children="LISTES" />
              <div className={classes.detailscontainer}>
                <ListForm
                  lists={recipe.lists}
                  recipe={recipe}
                  onCreate={handleListCreate}
                />
              </div>
            </div>
          </Skeleton>
        </div>
      </div>

      <Modal size="xl" opened={opened} onClose={() => setOpened(false)}>
        <EditRecipe
          recipe={recipe}
          user={user}
          ingredients={ingredients}
          units={units}
          countries={countries}
          types={types}
          dishes={dishes}
          tags={tags}
          onSubmit={handleEditRecipe}
        />
      </Modal>
      <Rating />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const allIngredients = await prisma.ingredient.findMany();
  const allUnits = await prisma.unit.findMany();
  const allTypes = await prisma.type.findMany();
  const allCountries = await prisma.country.findMany();
  const allDishes = await prisma.dish.findMany();
  const allTags = await prisma.tag.findMany();
  return {
    props: {
      ingredients: allIngredients,
      units: allUnits,
      dishes: allDishes,
      types: allTypes,
      countries: allCountries,
      tags: allTags,
      id: id,
    },
  };
}

export default SelectedRecipe;
