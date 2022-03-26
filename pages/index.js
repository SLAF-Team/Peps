import Image from "next/image";
import prisma from "../lib/prisma.ts";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar/index";
import SearchBarHome from "../components/SearchBarHome/index";
import RecipeCard from "../components/recipeCard/index.jsx";
import Link from "next/link";

export default function Home({ recipes }) {
  const [filteredRecipes, setFilterRecipes] = useState(recipes);

  // async search fonction
  const getRecipes = async (data) => {
    try {
      const result = await axios.post(`/api/recipe/searchRecipes`, {
        ...data,
      });
      setFilterRecipes(result.data);
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <main className={styles.main}>
      {filteredRecipes.length > 0 ? (
        <div className={styles.hero}>
          <div className={styles.heroleft}>
            <Link
              className={styles.a}
              href={`/recipes/${filteredRecipes.slice(-1)[0].id}`}
            >
              <div
                className={styles.heroimg}
                style={{
                  backgroundImage: `url(${
                    filteredRecipes.slice(-1)[0].imageUrl
                  })`,
                }}
              >
              </div>
            </Link>
          </div>
          <div className={styles.heroright}>
            <div className={styles.herotextblock}>
              <p className={styles.p}>RECETTE</p>
              <a
                className={styles.a}
                href={`/recipes/${filteredRecipes.slice(-1)[0].id}`}
              >
                <h1 className={styles.h1}>
                  {filteredRecipes.slice(-1)[0].name}
                </h1>
              </a>
              <h4 className={styles.h4}>Damn, that's good.</h4>
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.search}>
        <h2 className={styles.h2}>Trouver une recette</h2>
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
        {filteredRecipes &&
          filteredRecipes
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
      <div></div>
      <Button href="/recipes" label="Voir toutes recettes" type="warning" />
      <br />
      <Button href="/recipes/new" label="Ajouter une recette" />
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
  return {
    props: {
      recipes: allRecipes,
    },
  };
}
