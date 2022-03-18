import { useUserContext } from "../../context/UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import styles from "./RecipeCard.module.css";

const RecipeCard = ({ recipe }) => {
  const { user } = useUserContext();
  const token = Cookies.get("token");

  const isLiked = user?.likes.some((like) => like.recipeId === recipe?.id);
  const hasLikes = recipe?._count ? true : false;

  async function addLike() {
    await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        likes: {
          create: [
            {
              userId: user.id,
            },
          ],
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  async function removeLike() {
    await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        likes: {
          deleteMany: {
            userId: user.id,
          },
        },
      },

      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  const handleDeleteLike = () => {
    removeLike();
  };

  const handleCreateLike = () => {
    addLike();
  };

  console.log(recipe?.id);

  return (
    <div className={styles.recipe__container}>
      <Link href={`/recipes/${recipe?.id}}`}>
        <img
          className={styles.recipe__img}
          src={recipe?.imageUrl}
          alt={`${recipe?.name} illustration`}
        />
      </Link>
      <Link href={`/recipes/${recipe?.id}}`} >
        <div className={styles.title__container}>
          <h1 className={styles.recipe__title}>{recipe?.name}</h1>
        </div>
      </Link>
      {hasLikes ? (
        <div className={styles.recipe__likes}>Likes: {recipe._count.likes}</div>
      ) : null}
      {isLiked ? (
        <button onClick={handleDeleteLike}>Liké</button>
      ) : (
        <button onClick={handleCreateLike}>Like!</button>
      )}
    </div>
  );
};

export default RecipeCard;
