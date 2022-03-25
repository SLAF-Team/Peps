import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import classes from "./Dishes.module.css";
import RecipeCard from "../../components/recipeCard/index.jsx";
import { Modal, Skeleton } from "@mantine/core";
import ButtonSettings from "../../components/ButtonSettings";
import { useUserContext } from "../../context/UserContext";
import ButtonForm from "../../components/ButtonForm";
import Button from "../../components/Button";
import moment from "moment";

const SelectedDish = () => {
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const router = useRouter();
  const { id } = router.query;
  const [dish, setDish] = useState(null);
  const [titleChange, setTitleChange] = useState();
  const [descriptionChange, setDescriptionChange] = useState();
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  const getDish = async () => {
    try {
      const result = await axios.get(`/api/dish/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDish(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDish();
  }, [id]);

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
    console.log(result);
    if (result.status === 200) {
      const lol = await axios.put(
        "/api/update/addUpdate",
        {
          userId: user.id,
          dishId: dish.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(lol);
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
                  Recettes associées ({dish?.recipes.length})
                </p>
              </div>
            </div>
            <div className="row">
              <div className={classes.cards}>
                {dish?.recipes &&
                  dish?.recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      like_count={recipe?._count?.likes}
                      comment_count={recipe?._count?.comments}
                      col="col-4 col-6-sm"
                    />
                  ))}
              </div>
            </div>
          </Skeleton>
        </div>
        <div className="col-3">
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.padding}>
              {token != null && (
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
                <ul>
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
                  <p className={classes.selectorText}>WIKI</p>
                </div>
              </div>
              <div>
                <ul>
                  {dish?.updates.map((update, index) => (
                    <p key={index}>
                      Modifié par {update.user.name}{" "}
                      {moment(update.createdAt).fromNow()}
                    </p>
                  ))}
                </ul>
              </div>
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
              defaultValue={dish?.title}
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
              defaultValue={dish?.description}
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

export default SelectedDish;
