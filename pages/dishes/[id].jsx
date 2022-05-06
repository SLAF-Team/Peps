import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import classes from "./Dishes.module.css";
import RecipeCard from "../../components/recipeCard/index.jsx";
import { Modal, Skeleton } from "@mantine/core";
import { useUserContext } from "../../context/UserContext";
import moment from "moment";
import EditDish from "../../components/EditDish";
import Link from "next/link";
import { useRouter } from "next/router";

const SelectedDish = () => {
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { id } = router.query;
  const totalRecipes = dish?._count.recipes;

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
  }, [id, page]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleEditDish = () => {
    setOpened(false);
    getDish();
  };

  const setPageNumber = (number) => {
    setPage(page + number);
  };

  return (
    <>
      <div className="row">
        <div className="col-9">
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <img src={dish?.imageUrl} className={classes.mainImage} />
          </Skeleton>
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.titlecontainer}>
              <h1 className={classes.h1}>{dish?.title}</h1>
              <p className={classes.selectorName}>{dish?.region.name}</p>
            </div>
          </Skeleton>
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.stepscontainer}>
              <p className={classes.description}>{dish?.description}</p>
            </div>
            <div className={classes.selector}>
              <div className="selectorBlock">
                <p className={classes.selectorText}>
                  Recettes associées ({totalRecipes})
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
            {totalRecipes > dish?.recipes.length ? (
              <div className={classes.loadMore}>
                <a onClick={() => setPageNumber(1)} className={classes.btn}>
                  Voir plus
                </a>
              </div>
            ) : (
              <div className={classes.loadMore}>
                <a onClick={() => setPageNumber(-1)} className={classes.btn}>
                  Voir moins
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
                    <a href="#">{dish?.region.name}</a>
                  </li>
                </ul>
              </div>
            </div>
          </Skeleton>

          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.padding}>
              <div className={classes.selector}>
                <div className="selectorBlock">
                  <p className={classes.selectorText}>HISTORIQUE</p>
                </div>
              </div>
              <div>
                <ul style={{ paddingInlineStart: "0px" }}>
                  {dish?.updates.map((update, index) => (
                    <li
                      key={index}
                      style={{ fontSize: "9px", listStyle: "none" }}
                    >
                      Modifié par{" "}
                      <Link href={"/users/" + update.user.id}>
                        {update.user.name}
                      </Link>{" "}
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
      <Modal size="xl" opened={opened} onClose={() => setOpened(false)}>
        <EditDish dish={dish} onEdit={handleEditDish} user={user} />
      </Modal>
    </>
  );
};

export default SelectedDish;
