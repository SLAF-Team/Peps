import { useState } from "react";
import starblack from "../../assets/images/starblack.svg";
import starfill from "../../assets/images/starfill.svg";
import Image from "next/image";
import styles from "./Star.module.css";

const Star = ({element}) => {
  const [star, setStar] = useState(starblack);
  const [rate, setRate] = useState(null);

  return (
          <Image
            src={star}
            width={20}
            height={20}
            value={element}
            key={element}
            onMouseOver={() => setStar(starfill)}
            onMouseOut={() => setStar(starblack)}
            onClick={() => setRate(element)}
          />
  );
};

export default Star;
