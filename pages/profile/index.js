import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import UserList from "../../components/UserList";
import Selector from "../../components/Selector";
import styles from "./Profile.module.css";
import RecipeCard from "../../components/recipeCard"

const Profile = () => {
  const { user, setUser } = useUserContext();
  const token = Cookies.get("token");
  const router = useRouter();

  // delete user bloc
  const handleDeleteUser = () => {
    if (window.confirm("Es tu sûr de vouloir supprimer ton compte?")) {
      deleteUser();
    }
  };

  async function deleteUser() {
    const result = await axios.delete("/api/user/deleteUser", {
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
        <div className={styles.selectorBlock}>
          <p className={styles.selectorText}>MES LISTES</p>
        </div>
      </div>
      <div className={styles.container}>
      {user?.recipes.map((recipe, index) => (
        <div key={`recipe-${index}`}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
      </div>
    </>
  );
};

export default Profile;
