import { useEffect, useState } from "react";
import starblack from "../../assets/images/starblack.svg";
import starfill from "../../assets/images/starfill.svg";
import styles from "./Rating.module.css";
import Image from "next/image";
import { useUserContext } from "../../context/UserContext";

const Rating = ({ recipe }) => {
  const { user } = useUserContext();
  const [targetedRate, setTargetedRate] = useState(0);
  const [rating, setRating] = useState(null);
  const [isRated, setIsRated] = useState(false);
  const [recipeRatings, setRecipeRatings] = useState([]);
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    setRecipeRatings(recipe.ratings);
  }, [recipe]);

  useEffect(() => {
    if (user) {
      setUserRatings(user.ratings);
    }
  }, [user]);

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
};

export default Rating;
