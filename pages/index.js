import prisma from "../lib/prisma.ts";
import styles from "../styles/Home.module.css";
import Button from "../components/Button";
import SearchBarHome from "../components/SearchBarHome/index";
import RecipeCard from "../components/recipeCard/index.jsx";
import Link from "next/link";
import SearchImage from "../components/SearchImage";
import DishCard from "../components/DishCard/DishCard";

export default function Home({ recipes, dishes }) {

  return (
    <main className={styles.main}>
      {recipes.length > 0 ? (
        <div className={styles.hero}>
          <div className={styles.heroleft}>
            <Link
              className={styles.a}
              href={`/recipes/${recipes.slice(-1)[0].id}`}
            >
              <div
                className={styles.heroimg}
                style={{
                  backgroundImage: `url(${recipes.slice(-1)[0].imageUrl})`,
                }}
              ></div>
            </Link>
          </div>
          <div className={styles.heroright}>
            <div className={styles.herotextblock}>
              <p className={styles.p}>RECETTE</p>
              <a
                className={styles.a}
                href={`/recipes/${recipes.slice(-1)[0].id}`}
              >
                <h1 className={styles.h1}>{recipes.slice(-1)[0].name}</h1>
              </a>
              <h4 className={styles.h4}>Damn, that's good.</h4>
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.search}>
        <h2 className={styles.h2}>A chaque plat, ses recettes. Elles sont toutes ici !</h2>
        <div>
          <SearchBarHome
            placeholder="Chercher une recette"
            className={styles.search}
          />
        </div>
      </div>
      <div className={styles.recipes}>
        <h3 className={styles.h3}>Nos dernières recettes</h3>
      </div>
      <div className="row">
        {recipes.length > 0 &&
          recipes
            .slice(-4)
            .map((recipe, i) => (
              <RecipeCard
                recipe={recipe}
                key={i}
                like_count={recipe?._count?.likes}
                comment_count={recipe?._count?.comments}
                col="col-3 col-6-sm"
              />
            ))}
      </div>
      <Button href="/recipes" label="Voir toutes les recettes" type="warning" />
      <br />
      <Button href="/recipes/new" label="Ajouter une recette" />
      <br />
      <div className={styles.recipes}>
        <h3 className={styles.h3}>Nos derniers plats</h3>
      </div>
      <div className="row">
        {dishes.length > 0 &&
          dishes
            .slice(-4)
            .map((dish, i) => (
              <DishCard dish={dish} key={i} col="col-3 col-6-sm" />
            ))}
      </div>
      <Button href="/dishes" label="Voir tous les plats" type="warning" />
      <br />
      <Button href="/dishes/new" label="Ajouter un plat" />
      <br />
    </main>
  );
}

export async function getServerSideProps() {
  const allRecipes = await prisma.recipe.findMany({
    include: {
      cook: { select: { email: true, name: true, id: true } },
      tags: { select: { id: true } },
      _count: { select: { likes: true, comments: true } },
    },
    where: { published: true },
  });
  const allDishes = await prisma.dish.findMany({
    include: {
      region: { select: { name: true, id: true } },
      recipes: true,
    },
  });
  return {
    props: {
      recipes: allRecipes,
      dishes: allDishes
    },
  };
}
