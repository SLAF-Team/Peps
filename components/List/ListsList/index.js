import classes from "./ListsList.module.css";
import Link from "next/link";

const ListsList = ({ lists }) => {
  return (
    <ul>
      {lists.map((list) => (
        <li className={classes.li}>
          <Link href={`/lists/${list?.id}}`}>{list?.name}</Link> par
          {list?.user?.name}
        </li>
      ))}
    </ul>
  );
};

export default ListsList;
