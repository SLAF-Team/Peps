import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import CommentsList from "./../../components/Comment/CommentsList";
import classes from "./Recipe.module.css";
import Button from "../../components/Button";
import CommentForm from "../../components/Comment/CommentForm";
import ListForm from "../../components/List/ListForm";
import Layout from "../../components/layout";
import heart from "../../assets/images/heart.svg";
import {
  Modal,
  LoadingOverlay,
  Tabs,
  Anchor,
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
    }, 500);
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
    <div className="row">
      <div className="col-9">
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <img src={recipe.imageUrl} className={classes.mainImage} />
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <div className={classes.titlecontainer}>
            <h1 className={classes.h1}>{recipe.name}</h1>
            <p className={classes.selectorName}>Par {recipe.cook.name}</p>
            {/*<Image src={heart} width={40} height={40} />*/}
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
            <p>Etapes: {recipe.steps}</p>
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
              setSubmitted={setSubmitted}
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
                    <CommentsList comments={recipe.comments} />
                  )}
                </Accordion.Item>
              </Accordion>
            )}
          </div>
        </Skeleton>
      </div>
      <div className="col-3">
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
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
                    <a href="#">
                      {element.quantity} {element.unit.name} de{" "}
                      {element.ingredient.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
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
                    <a href="#">#{tag.name}</a>
                  </li>
                ))}
            </ul>
          </div>
        </Skeleton>
        <Skeleton visible={loading} style={{ marginTop: 6 }}>
          <div className={classes.selector}>
            <div className="selectorBlock">
              <p className={classes.selectorText}>LISTES</p>
            </div>
          </div>
          <div className={classes.detailscontainer}>
            <ListForm lists={recipe.lists} recipe={recipe} setSubmitted={setSubmitted}/>
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
