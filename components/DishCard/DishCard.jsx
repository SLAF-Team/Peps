import Link from "next/link";
import styles from "./DishCard.module.css";

const DishCard = ({ dish, col }) => {
  return (
    <div className={col}>
      <Link href={`/dishes/${dish?.id}`}>
        <div className={styles.recipe__imgparent}>
          <div
            className={styles.recipe__img}
            style={{
              backgroundImage: `url(${dish.imageUrl})`,
            }}
          ></div>
        </div>
      </Link>
      <Link href={`/recipes/${dish?.id}`}>
        <div className={styles.title__container}>
          <h1 className={styles.recipe__title}>{dish?.title}</h1>
        </div>
      </Link>
    </div>
  );
};

export default DishCard;
