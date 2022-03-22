import { useState } from "react";
import UserList from "../../components/UserList";
import styles from "./Lists.module.css";
import RecipeCard from "../../components/recipeCard";
import prisma from "../../lib/prisma.ts";
import FilterSelector from "../../components/FilterSelector";

const Profile = ({ lists }) => {
  const [style, setStyle] = useState(false);

  const handleClickLeft = () => {
    setStyle(false);
  };

  const handleClickRight = () => {
    setStyle(true);
  };

  return (
    <>
      <UserList user={lists} color="#26c485" />
      <FilterSelector left={lists?.recipes.length} />
      <div className="row">
        {lists?.recipes.map((recipe) => (
          <RecipeCard recipe={recipe} col="col-3" />
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
      user: { select: { name: true } },
      recipes: true,
    },
  });
  return {
    props: {
      lists: allLists,
    },
  };
}

export default Profile;
