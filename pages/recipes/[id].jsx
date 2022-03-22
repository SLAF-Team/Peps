import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import CommentsList from "./../../components/Comment/CommentsList";
import classes from "./Recipe.module.css";
import Button from "../../components/Button";
import CommentForm from "../../components/Comment/CommentForm";
import { useCallback } from "react";
import ListList from "../../components/List/ListsList";
import ListForm from "../../components/List/ListForm";
import { Tabs } from "@mantine/core";
import Layout from "../../components/layout";
import { Modal } from "@mantine/core";
// import NestedLayout from '../components/NestedLayout'

const SelectedRecipe = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [nameChange, setNameChange] = useState();
  const [descriptionChange, setDescriptionChange] = useState();
  const [opened, setOpened] = useState(false);

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
  }, [id]);

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

  //todo : plutôt renvoyer vers une erreur ?? Not Found

  if (!recipe) {
    return null;
  }

  return (
    <div style={{ margin: "20px" }} className={classes.maincontainer}>
      <div className={classes.leftcontainer}>
        <img src={recipe.imageUrl} className={classes.mainImage} />
        <div className={classes.titlecontainer}>
          <h1 className={classes.h1}>{recipe.name}</h1>
        </div>
        <div className={classes.detailstitlecontainer}>
          <h2 className={classes.h2}>{recipe.type.name}</h2>
          <div className={classes.dishcontainer}>
            <p className={classes.dishtitle}>{recipe.dish?.title}</p>
          </div>
        </div>
        <p className={classes.description}>Description: {recipe.description}</p>
        <div className={classes.mobiletabcontainer}>
          <Tabs grow tabPadding="xl" position="center" color="dark">
            <Tabs.Tab label="INGREDIENTS">
              <ul>
                <li className={classes.li}>Tomate</li>
                <li className={classes.li}>Huile d'olive</li>
                <li className={classes.li}>Oeufs</li>
                <li className={classes.li}>Courgettes</li>
                <li className={classes.li}>Ail</li>
              </ul>
            </Tabs.Tab>
            <Tabs.Tab label="ETAPES">
              <div className={classes.stepsmobilecontainer}>
                <ul>
                  <li className={classes.steps}>{recipe.steps}</li>
                </ul>
              </div>
            </Tabs.Tab>
          </Tabs>
        </div>
        <div className={classes.stepscontainer}>
          <p>Etapes: {recipe.steps}</p>
        </div>
        <div className={classes.commentcontainer}>
          <h1 className={classes.h1}>{recipe?.comments.length} Commentaires</h1>
          <CommentForm user={user} recipe={recipe} />
          {recipe?.comments && <CommentsList comments={recipe.comments} />}
        </div>
      </div>
      <div className={classes.rightcontainer}>
        <div className={classes.ingredientcontainer}>
          <h3 className={classes.h3}>Ingrédients</h3>
          <ul>
            {recipe?.ingredientsUnit &&
              recipe?.ingredientsUnit.map((element) => (
                <li className={classes.li}>
                  {element.quantity} {element.unit.name} de{" "}
                  {element.ingredient.name}
                </li>
              ))}
          </ul>
        </div>
        <div className={classes.detailscontainer}>
          <h3 className={classes.h3}>Tags</h3>
          <ul>
            {recipe?.tags &&
              recipe?.tags.map((tag) => (
                <li className={classes.li}>{tag.name}</li>
              ))}
          </ul>
        </div>
        <div className={classes.detailscontainer}>
          <h3 className={classes.h3}>Listes</h3>
          <ListForm lists={recipe.lists} recipe={recipe} />
        </div>
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
