import { useEffect, useState } from "react";
import starblack from "../../assets/images/starblack.svg";
import starfill from "../../assets/images/starfill.svg";
import styles from "./Rating.module.css";
import Image from "next/image";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";
import { useNotifications } from "@mantine/notifications";
import Cookies from "js-cookie";

const Rating = ({ recipe, onCreate }) => {
  const token = Cookies.get("token");
  const notifications = useNotifications();
  const { user } = useUserContext();
  const [targetedRate, setTargetedRate] = useState(0);
  const [rating, setRating] = useState(null);
  const [userHasRated, setUserHasRated] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [recipeRatings, setRecipeRatings] = useState([]);

  useEffect(() => {
    if (recipe) {
      setRecipeRatings(recipe.ratings);
    }
  }, [recipe]);

  useEffect(() => {
    if (user) {
      setUserHasRated(
        recipeRatings.filter((element) => element.userId === user.id).length > 0
          ? true
          : false
      );
    }
  }, [user, recipeRatings]);

  useEffect(() => {
    if (userHasRated) {
      setUserRating(
        recipeRatings.filter((element) => element.userId === user.id)[0].rating
      );
    }
  }, [userHasRated, recipe]);

  async function addRating() {
    if (!user) {
      notifications.showNotification({
        title: "Erreur",
        message: "Vous devez être connecté pour noter une recette.",
        color: "red",
      });
    } else {
      await axios.post(
        "/api/rating/addRating",
        {
          recipeId: recipe.id,
          userId: user.id,
          rating,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onCreate();
      notifications.showNotification({
        title: "Bravo!",
        message: "Votre note a été prise en compte",
        color: "green",
      });
    }
  }

  useEffect(() => {
    if (rating) {
      addRating();
    }
  }, [rating]);

  if (userHasRated) {
    return (
      <>
        Vous avez noté cette recette
        <div className={styles.rating__box}>
          {Array(userRating)
            .fill(1)
            .map((element, index) => (
              <div className={styles.rating__star}>
                <Image
                  src={starfill}
                  width={30}
                  height={30}
                  value={index + 1}
                  key={index + 1}
                />
              </div>
            ))}
          {Array(5 - userRating)
            .fill(1)
            .map((element, index) => (
              <div className={styles.rating__star}>
                <Image
                  src={starblack}
                  width={30}
                  height={30}
                  value={userRating + index + 1}
                  key={userRating + index + 1}
                />
              </div>
            ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        Noter cette recette
        <div className={styles.rating__box}>
          {Array(targetedRate)
            .fill(1)
            .map((element, index) => (
              <div className={styles.rating__star}>
                <Image
                  src={starfill}
                  width={30}
                  height={30}
                  value={index + 1}
                  key={index + 1}
                  onMouseOut={() => setTargetedRate(0)}
                  onClick={() => setRating(index + 1)}
                />
              </div>
            ))}
          {Array(5 - targetedRate)
            .fill(1)
            .map((element, index) => (
              <div className={styles.rating__star}>
                <Image
                  src={starblack}
                  width={30}
                  height={30}
                  value={targetedRate + index + 1}
                  key={targetedRate + index + 1}
                  onMouseEnter={() => setTargetedRate(index + 1)}
                  onClick={() => setRating(targetedRate + index + 1)}
                />
              </div>
            ))}
        </div>
      </>
    );
  }
};

export default Rating;
