import { useUserContext } from "../../context/UserContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserList from "../../components/UserList";
import styles from "./Profile.module.css";
import RecipeCard from "../../components/recipeCard";
import prisma from "../../lib/prisma.ts";
import Selector from "../../components/Selector";
import AddList from "../../components/List/AddList";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";

const Profile = ({ recipes, lists }) => {
  const { query } = useRouter();
  const { user, setUser } = useUserContext();
  const [contribution, setContribution] = useState(false);
  const [style, setStyle] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const token = Cookies.get("token");

  async function getUser() {
    const result = await axios.get("/api/user/getCurrentUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(result.data.user);
  }

  useEffect(() => {
    getUser();
  }, [submitted]);

  useEffect(() => {
    if (query.list) {
      setContribution(true);
      setStyle(true);
    }
  }, [query.list]);

  const handleClickLeft = () => {
    setContribution(false);
    setStyle(false);
  };

  const handleClickRight = () => {
    setContribution(true);
    setStyle(true);
  };

  const recipesFromUser = user
    ? recipes.filter((element) => element.cookId === user.id)
    : null;

  const listsFromUser = user
    ? lists.filter((element) => element.userId === user.id)
    : null;

  return (
    <>
      <UserList user={user} color="#ffd12f" />
      <Selector
        left="MES CONTRIBUTIONS"
        right="MES LISTES"
        handleClickLeft={handleClickLeft}
        handleClickRight={handleClickRight}
        style={style}
      />
      {!contribution ? (
        <div className={styles.cards}>
          <div className="row">
            {recipesFromUser?.map((recipe, index) => (
              <RecipeCard recipe={recipe} key={index} col="col-3" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            <div className={styles.listHeader}>
              <div className="col-2 col-4-sm"></div>
              <div className="col-6 col-4-sm">
                <span className={styles.spanHeader}>Titre</span>
              </div>
              <div className="col-4 col-4-sm">
                <span className={styles.spanHeader}>Dernière mise à jour</span>
              </div>
            </div>
          </div>
          {listsFromUser?.map((list) => (
            <div className="row">
              <div className={styles.listCards}>
                <Link href={"/lists/" + list.id} exact>
                  <div className="col-2 col-4-sm">
                    <div className={styles.avatar}>
                      <span className={styles.letter}>
                        {list?.name[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                </Link>
                <Link href={"/lists/" + list.id} exact>
                  <div
                    className="col-6 col-4-sm"
                    style={{ marginTop: "1rem", marginBottom: "1rem" }}
                  >
                    <p>{list.name}</p>
                  </div>
                </Link>
                <Link href={"/lists/" + list.id} exact>
                  <div
                    className="col-4 col-4-sm"
                    style={{ marginTop: "1rem", marginBottom: "1rem" }}
                  >
                    <p>{moment(list.updatedAt).fromNow()}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
          <div className={styles.center}>
            <AddList user={user} setSubmitted={setSubmitted} />
          </div>
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const allRecipes = await prisma.recipe.findMany({
    include: {
      _count: { select: { likes: true } },
      _count: { select: { comments: true } },
    },
  });
  const allLists = await prisma.list.findMany({
    include: {
      recipes: true,
      user: { select: { name: true } },
    },
  });
  console.log(allLists)
  return {
    props: {
      recipes: allRecipes,
      lists: allLists,
    },
  };
}

export default Profile;
