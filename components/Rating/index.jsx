import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import star from "../../assets/images/star.svg";
import Image from "next/image";

const Rating = () => {
  const [rate, setRate] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get("token");

  return (
    <>
      Notez cette recette !
      {[1, 2, 3, 4, 5].map((element, index) => (
        <Image
          src={star}
          width={20}
          height={20}
          value={element}
          key={index}
          onClick={() => setRate(element)}
        />
      ))}
    </>
  );
};

export default Rating;
