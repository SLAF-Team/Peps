import Link from "next/link";
import classes from "./RecipeTitle.module.css";

const RecipeTitle = ({ recipe }) => {
  return (
    <>
      <div className={classes.titlecontainer}>
        <h1 className={classes.h1}>{recipe.name}</h1>
        <p className={classes.selectorName}>
          Par <Link href={"/users/" + recipe.cookId}>{recipe.cook.name}</Link>
        </p>
      </div>
      <div className={classes.selector}>
        <div className="selectorBlock">
          <Link href={"/dishes/" + recipe.dish?.id}>
            <p className={classes.selectorText}>
              Une variante de{" "}
              <span className={classes.selectorSpan}>{recipe.dish?.title}</span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecipeTitle;
