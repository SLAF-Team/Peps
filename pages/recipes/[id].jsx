import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import CommentsList from "./../../components/Comment/CommentsList";
import classes from "./Recipe.module.css";
import Button from "../../components/Button";
import CommentForm from "../../components/Comment/CommentForm";
import ListForm from "../../components/List/ListForm";
import {
  Modal,
  LoadingOverlay,
  Anchor,
  Tabs,
  Skeleton,
  Accordion,
} from "@mantine/core";

const SelectedRecipe = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [nameChange, setNameChange] = useState();
  const [descriptionChange, setDescriptionChange] = useState();
  const [opened, setOpened] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const isAuthor = recipe?.cookId == user?.id ? true : false;

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
      console.log("error");
    }
  };

  useEffect(() => {
    getRecipe();
  }, [id, submitted]);

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
        description: descriptionChange,
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

  const handleDescription = (e) => {
    setDescriptionChange(e.target.value);
  };

  const handleClick = () => {
    setOpened(true);
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

  return (
    <div style={{ margin: "20px" }} className={classes.maincontainer}>
      <div className={classes.leftcontainer}>
        <Skeleton visible={loading} style={{ marginTop: 10 }}>
          <img src={recipe.imageUrl} className={classes.mainImage} />
        </Skeleton>
        <br></br>
        <Skeleton visible={loading} style={{ marginTop: 10 }}>
          <div className={classes.titlecontainer}>
            <h1 className={classes.h1}>{recipe.name}</h1>
            <h2 className={classes.h2}>
              <Anchor
                href={"/dishes/" + recipe.dish?.id}
                target="_blank"
                color="cookogsyellow"
              >
                {recipe.dish?.title}
              </Anchor>
            </h2>
          </div>
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 10 }}>
          <p className={classes.description}>
            Description: {recipe.description}
          </p>
        </Skeleton>

        <div className={classes.mobiletabcontainer}>
          <Tabs grow tabPadding="xl" position="center" color="dark">
            <Skeleton visible={loading} style={{ marginTop: 10 }}>
              <Tabs.Tab label="INGREDIENTS">
                <ul>
                  {recipe?.ingredientsUnit &&
                    recipe?.ingredientsUnit.map((element) => (
                      <li className={classes.li} key={element.id}>
                        {element.quantity} {element.unit.name} de{" "}
                        <Anchor
                          href={"/ingredient/" + element.ingredient.id}
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
            <Skeleton visible={loading} style={{ marginTop: 10 }}>
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
        <Skeleton visible={loading} style={{ marginTop: 10 }}>
          <div className={classes.stepscontainer}>
            <p>Etapes: {recipe.steps}</p>
          </div>
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 10 }}>
          <div className={classes.commentcontainer}>
            <h1 className={classes.h1}>Commenter</h1>
            <CommentForm
              user={user}
              recipe={recipe}
              setSubmitted={setSubmitted}
            />
            <br></br>
            <Accordion>
              <Accordion.Item
                label={"Voir les " + recipe?.comments.length + " commentaires"}
              >
                {recipe?.comments && (
                  <CommentsList comments={recipe.comments} />
                )}
              </Accordion.Item>
            </Accordion>
          </div>
        </Skeleton>
      </div>

      <div className={classes.rightcontainer}>
        <Skeleton visible={loading} style={{ marginTop: 10 }}>
          <div className={classes.ingredientcontainer}>
            <h3 className={classes.h3}>Ingrédients</h3>
            <ul>
              {recipe?.ingredientsUnit &&
                recipe?.ingredientsUnit.map((element) => (
                  <li className={classes.li} key={element.id}>
                    {element.quantity} {element.unit.name} de{" "}
                    <Anchor
                      href={"/ingredient/" + element.ingredient.id}
                      target="_blank"
                      color="cookogsyellow"
                      size="xs"
                    >
                      {element.ingredient.name}
                    </Anchor>
                  </li>
                ))}
            </ul>
          </div>
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 10 }}>
          <div className={classes.detailscontainer}>
            <h3 className={classes.h3}>Tags</h3>
            <ul>
              {recipe?.tags &&
                recipe?.tags.map((tag) => (
                  <li className={classes.li} key={tag.id}>
                    {tag.name}
                  </li>
                ))}
            </ul>
          </div>
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 10 }}>
          <div className={classes.detailscontainer}>
            <h3 className={classes.h3}>Listes</h3>
            <ListForm
              lists={recipe.lists}
              recipe={recipe}
              setSubmitted={setSubmitted}
            />
          </div>
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 10 }}>
          <div className={classes.editcontainer}>
            <br></br>
            <Button
              label="Supprimer"
              type="danger"
              handleClick={() => deleteRecipe()}
              href="#"
              className={classes.button}
            />
            <br></br>
            <Button
              label="Editer"
              type="warning"
              handleClick={() => handleClick()}
              href="#"
              className={classes.button}
            />
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
          <label>Description</label>
          <textarea
            name="recipeDescription"
            type="text"
            style={{ width: "100%", height: "100px" }}
            defaultValue={recipe.description}
            onChange={handleDescription}
          />
          <button type="submit">J'édite</button>
        </form>
      </Modal>
    </div>
  );
};

export default SelectedRecipe;
