import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import styles from "./RecipeCard.module.css";
import heart from "../../assets/images/heart.svg";
import heartvar from "../../assets/images/heartvar.svg";
import comment from "../../assets/images/comment.svg";

const RecipeCard = ({ recipe }) => {
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [likes, setLikes] = useState(recipe._count.likes);
  const [comments, setComments] = useState(recipe._count.comments);

  const isLiked = user?.likes?.some((like) => like.recipeId === recipe?.id);
  const hasLikes = likes ? true : false;
  const hasComments = comments ? true : false;

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
    setLikes(likes - 1);
  };

  const handleCreateLike = () => {
    addLike();
    setLikes(likes + 1);
  };

  return (
    <div className={styles.recipe__container}>
      <div className={styles.recipe__cardcontainer}>
        <Link href={`/recipes/${recipe?.id}}`}>
          <div className={styles.recipe__imgparent}>
            <div
              className={styles.recipe__img}
              style={{
                backgroundImage: `url(${recipe?.imageUrl})`,
              }}
            >
            </div>
          </div>
        </Link>
        <div className={styles.recipe__likes}>
          {isLiked ? (
            <Image
              src={heartvar}
              width={20}
              height={20}
              onClick={handleCreateLike}
            />
          ) : (
            <Image
              src={heart}
              width={20}
              height={20}
              onClick={handleDeleteLike}
            />
          )}
          {hasLikes ? (
            <div className={styles.recipe__likescount}>
              {recipe._count?.likes}
            </div>
          ) : null}
        </div>
        <div className={styles.recipe__likes}>
          <Image src={comment} width={20} height={20} />
          {hasComments ? (
            <div className={styles.recipe__likescount}>
              {recipe._count?.comments}
            </div>
          ) : null}
        </div>
      </div>
      <Link href={`/recipes/${recipe?.id}}`}>
        <div className={styles.title__container}>
          <h1 className={styles.recipe__title}>{recipe?.name}</h1>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
