import prisma from "../lib/prisma.ts";
import styles from "../styles/Home.module.css";
import Button from "../components/Button";
import SearchBarHome from "../components/SearchBarHome/index";
import RecipeCard from "../components/recipeCard/index.jsx";
import Link from "next/link";
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
              <p className={styles.h4}>Damn, that's good.</p>
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.search}>
        <h2 className={styles.h2}>A chaque plat, ses recettes</h2>
        <div>
          <SearchBarHome placeholder="Chercher une recette" />
        </div>
      </div>
      <div className={styles.recipes}>
        <h3 className={styles.h3}>
          Nos dernières recettes{" "}
          <Link href="/recipes">
            <span className={styles.seeAll}>Découvrir</span>
          </Link>
        </h3>
        <div className="row">
          {recipes.length > 0 &&
            recipes
              .slice(-8)
              .map((recipe, i) => (
                <RecipeCard recipe={recipe} key={i} col="col-3 col-6-sm" />
              ))}
        </div>
      </div>
      <div className={styles.recipes}>
        <h3 className={styles.h3_bis}>
          Nos derniers plats{" "}
          <Link href="/dishes">
            <span className={styles.seeAll}>Découvrir</span>
          </Link>
        </h3>

        <div className="row">
          {dishes.length > 0 &&
            dishes
              .slice(-4)
              .map((dish, i) => (
                <DishCard dish={dish} key={i} col="col-6 col-6-sm" />
              ))}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const allRecipes = await prisma.recipe.findMany({
    include: {
      cook: { select: { email: true, name: true, id: true } },
      tags: { select: { id: true } },
      ratings: true,
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
      dishes: allDishes,
    },
  };
}
