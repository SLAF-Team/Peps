import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Rating = () => {
  const [rate, setRate] = useState(0);
<<<<<<< HEAD
=======
  const [dataRating, setDataRating] = useState();
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get("token")

  const getRecipe = async () => {
    if(!id){
      return;
    }
    try {
      const result = await axios.get(`/api/recipe/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataRating(result.data);
      console.log(result.data)
    } catch (err) {
      console.log("Error regarding the loading of recipes.");
    }
  };

  useEffect(() => {
    getRecipe()
  }, [])
>>>>>>> 4c5acbdc1f5b299d1d9b38a6ceb20e00f78a3bdf

  return (
    <>
      
    </>
  );
};
  
export default Rating;