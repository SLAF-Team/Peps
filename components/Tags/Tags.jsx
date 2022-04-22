import React from "react";
import classes from "./Tags.module.css";
import Link from "next/link";

const Tags = ({ recipe }) => {
  return (
    <div>
      <ul className={classes.ul}>
        {recipe?.tags &&
          recipe?.tags.map((tag, index) => (
            <li className={classes.li} key={index}>
              <Link href={"/recipes?tag=" + tag.id}>{"#" + tag.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Tags;
