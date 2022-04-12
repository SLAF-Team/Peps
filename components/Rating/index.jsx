import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import star from "../../assets/images/star";

const Rating = () => {
  const [rate, setRate] = useState(null);
  const [dataRating, setDataRating] = useState();
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get("token");

  // const getRecipe = async () => {
  //   if(!id){
  //     return;
  //   }
  //   try {
  //     const result = await axios.get(`/api/recipe/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setDataRating(result.data);
  //   } catch (err) {
  //     console.log("Error regarding the loading of recipes.");
  //   }
  // };

  // useEffect(() => {
  //   getRecipe()
  // }, [])

  return (
    <>
      Notez cette recette !
      {[1, 2, 3, 4, 5].map((element, index) => (
        <div value={element} onClick={() => setRate(element)}>
          {star}
        </div>
      ))}
    </>
  );
};

export default Rating;
