import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import CommentsList from "./../../components/Comment/CommentsList";
import classes from "./Recipe.module.css";
import Button from "../../components/Button";
import ButtonSettings from "../../components/ButtonSettings";
import CommentForm from "../../components/Comment/CommentForm";
import ListForm from "../../components/List/ListForm";
import Layout from "../../components/layout";
import heart from "../../assets/images/heart.svg";
import { Select } from "@mantine/core";
import prisma from "../../lib/prisma.ts";

import {
  Modal,
  LoadingOverlay,
  Tabs,
  Anchor,
  Skeleton,
  Accordion,
  NumberInput,
} from "@mantine/core";
import ButtonForm from "../../components/ButtonForm";
import EditRecipeIngredients from "../../components/editRecipe/editRecipeIngredients";

const SelectedRecipe = ({ ingredients, units }) => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [nameChange, setNameChange] = useState();
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const isPublic = recipe?.published;
  const isAuthor = recipe?.cookId == user?.id ? true : false;
  const [personsValue, setPersonsValue] = useState(0);
  const personsRatio = personsValue / recipe?.persons;

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

  const handleCommentCreate = () => {
    getRecipe();
  };

  const handleCommentDelete = () => {
    getRecipe();
  };

  const handleListCreate = () => {
    getRecipe();
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const editRecipe = async (event) => {
    event.preventDefault();

    await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        name: nameChange,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    notifications.showNotification({
      title: "Bravo!",
      message: "Votre recette a été publié avec succès",
      color: "green",
    });
    getRecipe();
  };

  const handleName = (e) => {
    setNameChange(e.target.value);
  };

  async function deleteRecipe() {
    if (window.confirm("Souhaitez vous supprimer ce plat?")) {
      await axios.delete(`/api/recipe/delete/${recipe?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
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
          <img src={recipe.imageUrl} className={classes.mainImage} />
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <div className={classes.titlecontainer}>
            <h1 className={classes.h1}>{recipe.name}</h1>
            <p className={classes.selectorName}>Par {recipe.cook.name}</p>
          </div>
          <div className={classes.selector}>
            <div className="selectorBlock">
              <Link href={"/dishes/" + recipe.dish?.id}>
                <p className={classes.selectorText}>
                  Une variante de{" "}
                  <span className={classes.selectorSpan}>
                    {recipe.dish?.title}
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <div className={classes.stepscontainer}>
            {recipe?.steps &&
              recipe?.steps.map((element, index) => (
                <div>
                  <p className={classes.steps}>Étape {index + 1}</p>
                  <p>{element.text} </p>
                </div>
              ))}
          </div>
        </Skeleton>

        <div className={classes.mobiletabcontainer}>
          <Tabs grow tabPadding="xl" position="center" color="dark">
            <Skeleton visible={loading} style={{ marginTop: 6 }}>
              <Tabs.Tab label="INGREDIENTS">
                <ul>
                  {recipe?.ingredientsUnit &&
                    recipe?.ingredientsUnit.map((element) => (
                      <li className={classes.li} key={element.id}>
                        {element.quantity} {element.unit.name} de{" "}
                        <Anchor
                          href={"/recipes?ingredient=" + element.ingredient.id}
                          target="_blank"
                          color="cookogsyellow"
                          size="xs"
                        >
                          {element.ingredient.name}
                        </Anchor>
                      </li>
                    ))}
                </ul>
              </Tabs.Tab>
            </Skeleton>
            <Skeleton visible={loading} style={{ marginTop: 6 }}>
              <Tabs.Tab label="ETAPES">
                <div className={classes.stepsmobilecontainer}>
                  <ul>
                    <li className={classes.steps}>{recipe.steps}</li>
                  </ul>
                </div>
              </Tabs.Tab>
            </Skeleton>
          </Tabs>
        </div>
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <div className={classes.commentcontainer}>
            <p className={classes.h2}>Commenter</p>
            <CommentForm
              user={user}
              recipe={recipe}
              onCreate={handleCommentCreate}
            />
            <br></br>
            {recipe?.comments.length != 0 && (
              <Accordion>
                <Accordion.Item
                  label={
                    "Voir les " + recipe?.comments.length + " commentaires"
                  }
                >
                  {recipe?.comments && (
                    <CommentsList
                      comments={recipe.comments}
                      onDelete={handleCommentDelete}
                    />
                  )}
                </Accordion.Item>
              </Accordion>
            )}
          </div>
        </Skeleton>
      </div>
      <div className="col-3">
        {isAuthor ? (
          <div className={classes.button}>
            <ButtonSettings
              label="Editer"
              type="warning"
              handleClick={() => setOpened(true)}
              href="#"
            />
          </div>
        ) : null}
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <div className={classes.padding}>
            <div className={classes.selector}>
              <div className="selectorBlock">
                <p className={classes.selectorText}>PERSONNES</p>
              </div>
            </div>
            <NumberInput
              style={{ marginTop: 10 }}
              value={personsValue}
              onChange={(val) => setPersonsValue(val)}
              required
              min={1}
              max={15}
              size="xs"
            />
            <div className={classes.selector}>
              <div className="selectorBlock">
                <p className={classes.selectorText}>INGRÉDIENTS</p>
              </div>
            </div>
            <div>
              <ul>
                {recipe?.ingredientsUnit &&
                  recipe?.ingredientsUnit.map((element) => (
                    <li className={classes.li}>
                      <Link
                        href={"/recipes?ingredient=" + element.ingredient.id}
                      >
                        {Math.round(10 * personsRatio * element.quantity) / 10 +
                          " " +
                          element.unit.name +
                          " de " +
                          element.ingredient.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <div className={classes.padding}>
            <div className={classes.selector}>
              <div className="selectorBlock">
                <p className={classes.selectorText}>TAGS</p>
              </div>
            </div>
            <div>
              <ul>
                {recipe?.tags &&
                  recipe?.tags.map((tag) => (
                    <li className={classes.li}>
                      <Link href={"/recipes?tag=" + tag.id}>
                        {"#" + tag.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <div className={classes.padding}>
            <div className={classes.selector}>
              <div className="selectorBlock">
                <p className={classes.selectorText}>LISTES</p>
              </div>
            </div>
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

      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form onSubmit={editRecipe}>
          <label>Name</label> <br />
          <input
            name="recipeName"
            type="text"
            defaultValue={recipe.name}
            onChange={handleName}
          />
          <br />
          {/* <label>Convives</label>
          <textarea
            name="recipePerson"
            type="text"
            style={{ width: "100%", height: "100px" }}
            defaultValue={recipe.persons}
            onChange={handlePersons}
          />
          <br />
          <label>Etapes</label>
          <textarea
            name="recipeSteps"
            type="text"
            style={{ width: "100%", height: "100px" }}
            defaultValue={recipe.step}
            onChange={handleSteps}
          />
          <label>Etapes</label>
          <textarea
            name="recipeSteps"
            type="text"
            style={{ width: "100%", height: "100px" }}
            defaultValue={recipe.step}
            onChange={handleSteps}
          /> */}
          <EditRecipeIngredients
            recipe={recipe}
            units={units}
            ingredients={ingredients}
          />
          <ButtonForm label="J'édite" theme="success" />
        </form>
      </Modal>
    </div>
  );
};

export async function getServerSideProps() {
  const allIngredients = await prisma.ingredient.findMany();
  const allUnits = await prisma.unit.findMany();
  return {
    props: {
      ingredients: allIngredients,
      units: allUnits,
    },
  };
}

export default SelectedRecipe;
