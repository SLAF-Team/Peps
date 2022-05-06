import Button from "../Button";
import ButtonForm from "../ButtonForm";
import axios from "axios";
import { useState, useEffect } from "react";
import classes from "./Dish.module.css";
import { Select } from "@mantine/core";
import Cookies from "js-cookie";
import { useNotifications } from "@mantine/notifications";

const EditDish = ({ dish, onEdit, user }) => {
  const notifications = useNotifications();
  const token = Cookies.get("token");
  const [titleValue, setTitleValue] = useState(dish.title);
  const [descriptionValue, setDescriptionValue] = useState(dish.description);
  const [imageUrlValue, setImageUrlValue] = useState(dish.imageUrl);
  const [regionValue, setRegionValue] = useState(dish.regionId.toString());
  const [regions, setRegions] = useState([]);
  const regionsData = [];
  regions.map((element) =>
    regionsData.push({ value: element.id.toString(), label: element.name })
  );

  const handleTitle = (e) => {
    setTitleValue(e.target.value);
  };

  const handleDescription = (e) => {
    setDescriptionValue(e.target.value);
  };

  const handleImageUrl = (e) => {
    setImageUrlValue(e.target.value);
  };

  useEffect(() => {
    getRegions();
  }, []);

  async function getRegions() {
    const result = await axios.get("/api/region/getRegions", {});
    setRegions(result.data);
  }

  async function editDish(event) {
    event.preventDefault();
    const title = titleValue;
    const description = descriptionValue;
    const imageUrl = imageUrlValue;
    const regionId = parseInt(regionValue);
    if (!title || !description) {
      notifications.showNotification({
        title: "Erreur dans votre formulaire !",
        message: "Un ou plusieurs éléments sont manquants",
        color: "red",
      });
    } else {
      const result = await axios.put(
        "/api/dish/editDish",
        {
          id: dish.id,
          title,
          description,
          imageUrl,
          regionId,
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
      onEdit();
    }
  }

  async function deleteDish() {
    if (window.confirm("Souhaitez vous supprimer ce plat?")) {
      await axios.delete(`/api/dish/delete/${dish?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/dishes/");
    }
  }

  return (
    <>
      <form onSubmit={editDish} className={classes.dishform}>
        <div className={classes.step}>
          <label className={classes.label}>Nom</label>
          <input
            className={classes.input}
            type="text"
            onChange={handleTitle}
            value={titleValue}
          />
        </div>
        <div className={classes.step}>
          <label className={classes.label}>Description</label>
          <input
            className={classes.input}
            onChange={handleDescription}
            value={descriptionValue}
            type="text"
          />
        </div>
        <div className={classes.step}>
          <label className={classes.label}>Image</label>
          <input
            type="text"
            onChange={handleImageUrl}
            value={imageUrlValue}
            className={classes.input}
          />
        </div>
        <div className={classes.step}>
          <label className={classes.label}>Région</label>
          <Select
            value={regionValue}
            onChange={setRegionValue}
            data={regionsData}
            searchable
            clearable
          />
        </div>
        <div className={classes.button}>
          <ButtonForm label={"j'édite"} theme="success" />
        </div>
      </form>
      {user?.isadmin ? (
        <div className={classes.button}>
          <Button
            handleClick={() => deleteDish()}
            label="Supprimer"
            href="#"
            type="danger"
          />
        </div>
      ) : null}
    </>
  );
};

export default EditDish;
