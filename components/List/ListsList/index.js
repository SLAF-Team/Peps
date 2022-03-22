import classes from "./ListsList.module.css";
import Link from "next/link";

const ListsList = ({ lists }) => {
  console.log(lists)
  return (
    <ul>
      {lists.map((list) => (
        <li className={classes.li} key={list.id}>
          <Link href={`/lists/${list?.id}}`}>{list?.name}</Link> par {list?.user?.name}
        </li>
      ))}
    </ul>
  );
};

export default ListsList;
