import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import prisma from "../../lib/prisma.ts";
import classes from "./Dishes.module.css";
import RecipeCard from "../../components/recipeCard/index.jsx";
import { Modal, Skeleton } from "@mantine/core";
import { useUserContext } from "../../context/UserContext";
import ButtonForm from "../../components/ButtonForm";
import Button from "../../components/Button";
import moment from "moment";

const SelectedDish = ({ recipes, id }) => {
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [dish, setDish] = useState(null);
  const [titleChange, setTitleChange] = useState();
  const [descriptionChange, setDescriptionChange] = useState();
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(1);

  const getDish = async () => {
    try {
      const result = await axios.get(`/api/dish/${id}?page=${page}`);
      setDish(result.data);
    } catch (err) {
      console.log("Error regarding the loading of dishes.");
    }
  };

  useEffect(() => {
    getDish();
  }, [token, page]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  async function editDish(event) {
    event.preventDefault();
    const result = await axios.put(
      "/api/dish/editDish",
      {
        id: dish.id,
        title: titleChange,
        description: descriptionChange,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (result.status === 200) {
      await axios.put(
        "/api/update/addUpdate",
        {
          userId: user.id,
          dishId: dish.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    getDish();
    setOpened(false);
  }

  async function deleteDish() {
    if (window.confirm("Souhaitez vous supprimer ce plat?")) {
      await axios.delete(`/api/dish/delete/${dish?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/dishes/");
    }
  }

  const handleTitle = (e) => {
    setTitleChange(e.target.value);
  };

  const handleDescription = (e) => {
    setDescriptionChange(e.target.value);
  };

  const loadMore = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  return (
    <>
      <div className="row">
        <div className="col-9">
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <img src={recipes?.imageUrl} className={classes.mainImage} />
          </Skeleton>
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.titlecontainer}>
              <h1 className={classes.h1}>{recipes?.title}</h1>
              <p className={classes.selectorName}>{recipes?.region.name}</p>
            </div>
          </Skeleton>
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.stepscontainer}>
              <p className={classes.description}>{recipes?.description}</p>
            </div>
            <div className={classes.selector}>
              <div className="selectorBlock">
                <p className={classes.selectorText}>
                  Recettes associées ({recipes?.recipes.length})
                </p>
              </div>
            </div>
            <div className="row">
              <div className={classes.cards}>
                {dish?.recipes &&
                  dish?.recipes.map((recipe, index) => (
                    <RecipeCard
                      key={index}
                      recipe={recipe}
                      col="col-4 col-6-sm"
                    />
                  ))}
              </div>
            </div>
            {recipes?.recipes.length != dish?.recipes.length && (
              <div className={classes.loadMore}>
                <a onClick={loadMore} className={classes.btn}>
                  Voir plus
                </a>
              </div>
            )}
          </Skeleton>
        </div>
        <div className="col-3">
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.padding}>
              {token && (
                <div className={classes.editBtn}>
                  <a
                    href="#"
                    onClick={() => setOpened(true)}
                    className={classes.btn}
                  >
                    Editer
                  </a>
                </div>
              )}
            </div>
          </Skeleton>
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.padding}>
              <div className={classes.selector}>
                <div className="selectorBlock">
                  <p className={classes.selectorText}>RÉGION</p>
                </div>
              </div>
              <div>
                <ul className={classes.ul}>
                  <li className={classes.li}>
                    <a href="#">{recipes?.region.name}</a>
                  </li>
                </ul>
              </div>
            </div>
          </Skeleton>

          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.padding}>
              <div className={classes.selector}>
                <div className="selectorBlock">
                  <p className={classes.selectorText}>WIKI</p>
                </div>
              </div>
              <div>
                <ul style={{ paddingInlineStart: "0px" }}>
                  {recipes?.updates.map((update, index) => (
                    <li
                      key={index}
                      style={{ fontSize: "9px", listStyle: "none" }}
                    >
                      Modifié par {update.user.name}{" "}
                      {moment(update.createdAt).fromNow()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Skeleton>
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.selector}>
              <div className="selectorBlock">
                <p className={classes.selectorText}></p>
              </div>
            </div>
            <div>
              <ul className={classes.ul}>
                <li className={classes.li} style={{ textAlign: "center" }}>
                  <a
                    href={"/dishes"}
                    style={{ fontSize: "12px", textAlign: "center" }}
                  >
                    Voir tous les plats
                  </a>
                </li>
              </ul>
            </div>
          </Skeleton>
        </div>
      </div>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <div className={classes.form}>
          <form onSubmit={editDish} className={classes.size}>
            <div>
              <label>Nom</label>
            </div>
            <input
              name="dishTitle"
              type="text"
              defaultValue={recipes?.title}
              onChange={handleTitle}
              className={classes.field}
            />
            <div>
              {" "}
              <label>Description</label>
            </div>
            <textarea
              name="dishDescription"
              type="text"
              style={{ width: "100%", height: "100px" }}
              defaultValue={recipes?.description}
              onChange={handleDescription}
              className={classes.field}
            />
            <ButtonForm label={"j'édite"} theme="success" />
          </form>
          <br />
          {user?.isadmin ? (
            <Button
              handleClick={() => deleteDish()}
              label="Supprimer"
              href="#"
              type="danger"
            />
          ) : null}
        </div>
      </Modal>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const allRecipes = await prisma.dish.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      updates: {
        include: {
          user: { select: { name: true, id: true } },
        },
      },
      region: true,
      recipes: {
        include: {
          _count: { select: { likes: true, comments: true } },
        },
      },
    },
  });
  return {
    props: {
      recipes: allRecipes,
      id: id,
    },
  };
}

export default SelectedDish;
