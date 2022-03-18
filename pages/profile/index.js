import { useUserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import UserList from "../../components/UserList";
import styles from "./Profile.module.css";
import RecipeCard from "../../components/recipeCard";
import prisma from "../../lib/prisma.ts";

const Profile = ({ recipes, lists }) => {
  const { user, setUser } = useUserContext();
  const token = Cookies.get("token");
  const router = useRouter();

  const recipesFromUser = user? recipes.filter((element) => element.cookId === user.id)
    : null;
    const listsFromUser = user? lists.filter((element) => element.userId === user.id)
      : null;

    console.log(listsFromUser);
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
      <UserList user={user} handleDeleteUser={handleDeleteUser} />
      <div className={styles.selector}>
        <div className={styles.selectorBlock}>
          <p className={styles.selectorText}>MES CONTRIBUTIONS</p>
        </div>
        {recipesFromUser &&
          recipesFromUser.map((recipe, index) => (
            <div key={`recipe-${index}`}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        <div className={styles.selectorBlock}>
          <p className={styles.selectorText}>MES LISTES</p>
          {listsFromUser &&
            listsFromUser.map((list, index) => (
              <div key={index}>
                {list.name}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  console.log(context)
  const allRecipes = await prisma.recipe.findMany({
    include: {
      _count: { select: { likes: true } },
    },
  });
    const allLists = await prisma.list.findMany({
    });
  return {
    props: {
      recipes: allRecipes,
      lists: allLists,
    },
  };
}

export default Profile;
