import { useUserContext } from "../../context/UserContext";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import UserList from "../../components/UserList";
import styles from "./Profile.module.css";
import RecipeCard from "../../components/recipeCard";
import prisma from "../../lib/prisma.ts";
import Button from "../../components/Button";
import Selector from "../../components/Selector";

const Profile = ({ recipes, lists }) => {
  const { user, setUser } = useUserContext();
  const token = Cookies.get("token");
  const router = useRouter();
  const [contribution, setContribution] = useState(false);
  const [style, setStyle] = useState(false);

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

  // delete user bloc
  const handleDeleteUser = () => {
    if (window.confirm("Es tu sûr de vouloir supprimer ton compte?")) {
      deleteUser();
    }
  };

  async function deleteUser() {
    await axios.delete("/api/user/deleteUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    Cookies.remove("token");
    setUser(null);
    router.push("/");
  }

  return (
    <>
      <UserList
        user={user}
        handleDeleteUser={handleDeleteUser}
        color="#ffd12f"
      />
      <Selector
        left="MES CONTRIBUTIONS"
        right="MES LISTES"
        handleClickLeft={handleClickLeft}
        handleClickRight={handleClickRight}
        style={style}
      />
      <div className={styles.cards}>
        {!contribution
          ? recipesFromUser?.map((recipe) => <RecipeCard recipe={recipe} />)
          : listsFromUser?.map((list) => (
              <Link href={"/lists/" + list.id} exact>
                <a>Liste : {list.id}</a>
              </Link>
            ))}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const allRecipes = await prisma.recipe.findMany({
    include: {
      _count: { select: { likes: true } },
    },
  });
  const allLists = await prisma.list.findMany({
    include: {
      recipes: true,
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
