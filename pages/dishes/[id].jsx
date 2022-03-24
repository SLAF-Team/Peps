import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import CommentsList from "./../../components/Comment/CommentsList";
import classes from "./Dishes.module.css";
import Button from "../../components/Button";
import CommentForm from "../../components/Comment/CommentForm";
import ListForm from "../../components/List/ListForm";
import Layout from "../../components/layout";
import heart from "../../assets/images/heart.svg";
import RecipeCard from "../../components/recipeCard/index.jsx";
import {
  Modal,
  LoadingOverlay,
  Tabs,
  Anchor,
  Skeleton,
  Accordion,
} from "@mantine/core";

const SelectedDish = ({ currentDish }) => {
  const token = Cookies.get("token");
  const router = useRouter();
  const { id } = router.query;
  const [dish, setDish] = useState(null);
  const [titleChange, setTitleChange] = useState();
  const [descriptionChange, setDescriptionChange] = useState();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);

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
    await axios.put(
      "/api/dish/editDish",
      {
        id: dish.id,
        title: titleChange,
        description: descriptionChange,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    getDish();
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
              {/*<Image src={heart} width={40} height={40} />*/}
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
                      recipe={recipe}
                      like_count={recipe?._count?.likes}
                      comment_count={recipe?._count?.comments}
                      col="col-4"
                    />
                  ))}
              </div>
            </div>
          </Skeleton>
        </div>
        <div className="col-3">
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.padding}>
              <div className={classes.selector}>
                <div className="selectorBlock">
                  <p className={classes.selectorText}>INGRÉDIENTS</p>
                </div>
              </div>
              <div>
                <ul>
                  <li className={classes.li}>
                    <a href="#">Prout</a>
                  </li>
                </ul>
              </div>
            </div>
          </Skeleton>
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.padding}>
              <div className={classes.selector}>
                <div className="selectorBlock">
                  <p className={classes.selectorText}>TAGS</p>
                </div>
              </div>
              <div>
                <ul>
                  <li className={classes.li}>
                    <a href="#">#Prout</a>
                  </li>
                </ul>
              </div>
            </div>
          </Skeleton>
          <Skeleton visible={loading} style={{ marginTop: 6 }}>
            <div className={classes.padding}>
              <div className={classes.selector}>
                <div className="selectorBlock">
                  <p className={classes.selectorText}>LISTES</p>
                </div>
              </div>
              <div className={classes.detailscontainer}></div>
            </div>
          </Skeleton>
        </div>
      </div>
      {user?.isadmin && (
        <>
          <h2>Admin </h2>
          <form onSubmit={editDish}>
            <label>Title</label> <br />
            <input
              name="dishTitle"
              type="text"
              defaultValue={dish?.title}
              onChange={handleTitle}
            />
            <br />
            <label>Description</label>
            <textarea
              name="recipekDescription"
              type="text"
              style={{ width: "100%", height: "100px" }}
              defaultValue={dish?.description}
              onChange={handleDescription}
            />
            <button type="submit">J'édite</button>
          </form>
          <br />
          <button onClick={deleteDish}>Supprimer</button>
        </>
      )}
    </>
  );
};

export default SelectedDish;
