import Button from "../Button";
import ButtonForm from "../ButtonForm";
import axios from "axios";
import { useState, useEffect } from "react";
import classes from "./Dish.module.css";
import { Select } from "@mantine/core";
import Cookies from "js-cookie";

const EditDish = ({ dish, onSubmit, user }) => {
  const token = Cookies.get("token")
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
    const result = await axios.put(
      "/api/dish/editDish",
      {
        id: dish.id,
        title: titleValue,
        description: descriptionValue,
        imageUrl: imageUrlValue,
        regionId: parseInt(regionValue),
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
    onSubmit();
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
    <div className={classes.form}>
      <form onSubmit={editDish} className={classes.size}>
        <div>
          <label>Nom</label>
        </div>
        <input
          type="text"
          onChange={handleTitle}
          value={titleValue}
          className={classes.field}
        />
        <div>
          {" "}
          <label>Description</label>
        </div>
        <textarea
          type="text"
          style={{ width: "100%", height: "100px" }}
          onChange={handleDescription}
          value={descriptionValue}
          className={classes.field}
        />
        <div>
          {" "}
          <label>Image</label>
        </div>
        <textarea
          type="text"
          style={{ width: "100%", height: "100px" }}
          onChange={handleImageUrl}
          value={imageUrlValue}
          className={classes.field}
        />
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
  );
};

export default EditDish;
