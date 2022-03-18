import axios from "axios";
import { useState } from "react";
import UserList from "../../components/UserList";
import styles from "./Lists.module.css";
import RecipeCard from "../../components/recipeCard";
import prisma from "../../lib/prisma.ts";
import Button from "../../components/Button";
import Selector from "../../components/Selector";

const Profile = ({ lists }) => {
  const [style, setStyle] = useState(false);

  const handleClickLeft = () => {
    setStyle(false);
  };

  const handleClickRight = () => {
    setStyle(true);
  };

  console.log(lists);

  return (
    <>
      <UserList user={lists} color="#26c485" />
      <div className={styles.cards}>
        {lists?.recipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const allLists = await prisma.list.findUnique({
    where: { id: parseInt(id) },
    include: {
      recipes: true,
      user: { select: { name: true } },
    },
  });
  return {
    props: {
      lists: allLists,
    },
  };
}

export default Profile;