import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import CommentsList from "./../../components/Comment/CommentsList";
import classes from "./Recipe.module.css";
import Button from "../../components/Button";
import CommentForm from "../../components/Comment/CommentForm";
import ListList from "../../components/List/ListsList";
import ListsForm from "../../components/List/ListForm";
import { useEffect } from "react";
import { useCallback } from "react";
import { Tabs } from "@mantine/core";

const SelectedRecipe = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [nameChange, setNameChange] = useState();
  const [descriptionChange, setDescriptionChange] = useState();


  const getRecipe = async () => {
    if (!id) {
      return;
    }
    try {
      const result = await axios.get(
        `/api/recipe/${id}`,
        {
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
  }

  const handleName = (e) => {
    setNameChange(e.target.value);
  };

  const handleDescription = (e) => {
    setDescriptionChange(e.target.value);
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
        <img src={recipe.imageUrl} className={classes.mainImage} />
        <div className={classes.mobileImage}></div>
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
          <h3>Commentaires</h3>
          {recipe.comments?.length && (
            <CommentsList comments={recipe.comments} />
          )}
          <CommentForm user={user} recipe={recipe} />
        </div>
      </div>
      <div className={classes.rightcontainer}>
        <div className={classes.ingredientcontainer}>
          <h3 className={classes.h3}>Ingrédients</h3>
          <ul>
            <li className={classes.li}>Tomate</li>
            <li className={classes.li}>Huile d'olive</li>
            <li className={classes.li}>Oeufs</li>
            <li className={classes.li}>Courgettes</li>
            <li className={classes.li}>Ail</li>
          </ul>
        </div>
        {/* <div className={classes.detailscontainer}>
          <h3 className={classes.h3}>Tags</h3>
          <ul>
            <li className={classes.li}>Vegan</li>
            <li className={classes.li}>Sans Sucre</li>
            <li className={classes.li}>Piquant</li>
          </ul>
        </div> */}
        <div className={classes.detailscontainer}>
          <h3 className={classes.h3}>Listes</h3>
          <ListList lists={recipe.lists} />
          <ListsForm lists={recipe.lists} recipe={recipe} />
        </div>
        <button onClick={deleteRecipe}>Supprimer</button>
        <div className={classes.detailscontainer}></div>
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
            handleClick={() => editRecipe()}
            href="#"
            className={classes.button}
          />
        </div>
      </div>
      <form>
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
        <button type="submit" onClick={editRecipe}>
          J'édite
        </button>
      </form>
    </div>
  );
};

export default SelectedRecipe;