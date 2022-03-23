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
import { useEffect } from "react";

const RecipeCard = ({ recipe, like_count, col }) => {
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [comments, setComments] = useState(recipe?._count?.comments);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(like_count);
  const hasLikes = likes ? true : false;
  const hasComments = comments ? true : false;

  // le _count ne passe pas en props, pourquoi ?
  // Pourtant le parent les envoie

  useEffect(() => {
    setIsLiked(user?.likes.some((like) => like.recipeId === recipe.id));
  }, [user]);

  async function addLike() {
    const result = await axios.put(
      "/api/like/addLike",
      {
        recipeId: recipe.id,
        userId: user.id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(result);
  }

  async function removeLike() {
    await axios.delete(`/api/like/${recipe.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  const handleDeleteLike = () => {
    removeLike();
    setLikes(likes - 1);
    setIsLiked(!isLiked);
  };

  const handleCreateLike = () => {
    addLike();
    setLikes(likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className={col}>
      <Link href={`/recipes/${recipe?.id}`}>
        <div className={styles.recipe__imgparent}>
          <div
            className={styles.recipe__img}
            style={{
              backgroundImage: `url(${recipe.imageUrl})`,
            }}
          ></div>
        </div>
      </Link>
      <div className={styles.recipe__reaction}>
        <div className={styles.recipe__likes}>
          {isLiked ? (
            <Image
              src={heartvar}
              width={20}
              height={20}
              onClick={() => handleDeleteLike()}
            />
          ) : (
            <Image
              src={heart}
              width={20}
              height={20}
              onClick={() => handleCreateLike()}
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
      <Link href={`/recipes/${recipe?.id}`}>
        <div className={styles.title__container}>
          <h1 className={styles.recipe__title}>{recipe?.name}</h1>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
