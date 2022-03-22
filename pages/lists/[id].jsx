import { useState } from "react";
import UserList from "../../components/UserList";
import classes from "./Lists.module.css";
import RecipeCard from "../../components/recipeCard";
import prisma from "../../lib/prisma.ts";
import FilterSelector from "../../components/FilterSelector";
import { checkAuthorAuth } from "../../lib/authfront";
import { useUserContext } from "../../context/UserContext";
import Button from "../../components/Button";
import Cookies from "js-cookie";
import { useNotifications } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/router";

const Profile = ({ list }) => {
  const {user} = useUserContext();
  const token = Cookies.get("token");
  const router = useRouter();
  const notifications = useNotifications();

  const handleClickLeft = () => {
    setStyle(false);
  };

  const handleClickRight = () => {
    setStyle(true);
  };

  async function deleteList() {
      if (window.confirm("Souhaitez vous supprimer cette liste?")) {
        const result = await axios.delete(`/api/list/delete/${list?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      router.push('/lists')
      console.log(result);
    }

  const handleDeleteList = () => {
    //notif
    deleteList();
    //notif
  };

    const updateList = () => {};

  return (
    <>
      <UserList user={list} color="#26c485" />
      <FilterSelector left={list?.recipes.length} />
      <div className="row">
        {list?.recipes.map((recipe) => (
          <RecipeCard recipe={recipe} col="col-3" />
        ))}
      </div>
      {checkAuthorAuth(user, list) && (
        <>
          <Button
            label="Supprimer"
            type="danger"
            handleClick={() => handleDeleteList()}
            href="#"
            className={classes.button}
          />
          <br></br>
          <Button
            label="Editer"
            type="warning"
            handleClick={() => updateList()}
            href="#"
            className={classes.button}
          />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const oneList = await prisma.list.findUnique({
    where: { id: parseInt(id) },
    include: {
      user: { select: { name: true } },
      recipes: true,
    },
  });
  return {
    props: {
      list: oneList,
    },
  };
}

export default Profile;
