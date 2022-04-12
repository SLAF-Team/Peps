import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import styles from "./RecipeCard.module.css";
import heart from "../../assets/images/heart.svg";
import heartvar from "../../assets/images/heartvar.svg";
import star from "../../assets/images/star.svg";
import comment from "../../assets/images/comment.svg";
import { useEffect } from "react";
import { useNotifications } from "@mantine/notifications";
import meanBy from "lodash.meanby";

const RecipeCard = ({ recipe, col }) => {
  console.log(recipe)
  const { user, setUser } = useUserContext();
  const token = Cookies.get("token");
  const [currentRecipe, setCurrentRecipe] = useState(recipe);
  const [comments, setComments] = useState(
    recipe._count ? recipe._count.comments : []
  );
  const [likes, setLikes] = useState(recipe._count ? recipe._count.likes : []);
  const [ratings, setRatings] = useState(
    recipe.ratings ? meanBy(recipe.ratings, (p) => p.rating) : null
  );
  const [isLiked, setIsLiked] = useState(false);
  const hasLikes = likes ? true : false;
  const hasComments = comments ? true : false;
  const hasRatings = ratings ? true : false;
  const notifications = useNotifications();

  const getRecipe = async () => {
    try {
      const result = await axios.get(`/api/recipe/${currentRecipe.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentRecipe(result.data);
      setComments(result.data._count ? result.data._count.comments : []);
      setLikes(result.data._count ? result.data._count.likes : []);
    } catch (err) {
      console.log("Error regarding the loading of recipes on recipecard.");
    }
  };

  async function getUser() {
    const result = await axios.get("/api/user/getCurrentUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(result.data.user);
  }

  useEffect(() => {
    setIsLiked(
      user
        ? user.likes
          ? user.likes.some((like) => like.recipeId === currentRecipe.id)
          : false
        : false
    );
  }, [user, currentRecipe]);

  async function addLike() {
    if (!user) {
      notifications.showNotification({
        title: "Connexion !",
        message: "Merci de vous connecter pour liker",
        color: "red",
      });
    } else {
      await axios.put(
        "/api/like/addLike",
        {
          recipeId: currentRecipe.id,
          userId: user.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getRecipe();
      getUser();
    }
  }

  async function removeLike() {
    await axios.delete(`/api/like/delete/${currentRecipe.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getRecipe();
    getUser();
  }

  const handleDeleteLike = () => {
    removeLike();
  };

  const handleCreateLike = () => {
    addLike();
  };

  return (
    <div className={col}>
      <Link href={`/recipes/${currentRecipe?.id}`}>
        <div className={styles.recipe__imgparent}>
          <div
            className={styles.recipe__img}
            style={{
              backgroundImage: `url(${currentRecipe.imageUrl})`,
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
            <div className={styles.recipe__likescount}>{likes}</div>
          ) : null}
        </div>
        <div className={styles.recipe__likes}>
          <Image src={comment} width={20} height={20} />
          {hasComments ? (
            <div className={styles.recipe__likescount}>{comments}</div>
          ) : null}
        </div>
        <div className={styles.recipe__likes}>
          <Image src={star} width={20} height={20} />
          {hasRatings ? (
            <div className={styles.recipe__likescount}>{ratings}</div>
          ) : null}
        </div>
      </div>
      <Link href={`/recipes/${currentRecipe?.id}`}>
        <div className={styles.title__container}>
          <h1 className={styles.recipe__title}>{currentRecipe?.name}</h1>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
