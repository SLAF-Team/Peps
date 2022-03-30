import React, { useState, useEffect } from "react";
import axios from 'axios';

const Rating = () => {
  const [rate, setRate] = useState(0);
  const [dataRating, setDataRating] = useState();
  const router = useRouter();
  const { id } = router.query;
  const token = Cookie.ge



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


  return (
    <>
      
    </>
  );
};
  
export default Rating;