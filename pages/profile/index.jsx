import { useUserContext } from "../../context/UserContext";
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
import { useNotifications } from "@mantine/notifications";
import List from "../../components/List/List";

const Profile = ({ recipes, lists }) => {
  const { query } = useRouter();
  const { user, setUser } = useUserContext();
  const [contribution, setContribution] = useState(false);
  const [style, setStyle] = useState(false);
  const [listChange, setListChange] = useState(0);
  const token = Cookies.get("token");
  const router = useRouter();
  const notifications = useNotifications();

  useEffect(() => {
    if (token !== undefined) {
      return;
    } else {
      notifications.showNotification({
        title: "Connexion",
        message: "Merci de vous connecter pour accéder à cette page",
        color: "red",
      });
      router.push("/login");
    }
  }, [token]);

  async function getUser() {
    const result = await axios.get("/api/user/getCurrentUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(result.data.user);
  }

  useEffect(() => {
    getUser();
  }, [listChange]);

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
              <RecipeCard
                recipe={recipe}
                key={index}
                like_count={recipe?._count?.likes}
                comment_count={recipe?._count?.comments}
                col="col-3 col-6-sm"
              />
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
          {listsFromUser?.map((list, index) => (
            <div className="row">
              <div className={styles.listCards}>
                <List list={list} key={index} />
              </div>
            </div>
          ))}
          <div className={styles.center}>
            <AddList user={user} setListChange={setListChange} />
          </div>
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const allRecipes = await prisma.recipe.findMany({
    include: {
      _count: { select: { likes: true, comments: true } },
    },
  });
  const allLists = await prisma.list.findMany({
    include: {
      recipes: true,
      user: { select: { name: true } },
    },
  });
  return {
    props: {
      recipes: allRecipes,
      lists: allLists,
    },
  };
}

export default Profile;
