import classes from "./ListsList.module.css";

const ListsList = ({ lists }) => {
  return (
    <ul>
      {lists.map((list) => (
        <li className={classes.li}>
          {list.name} par {list.user?.name}
        </li>
      ))}
      ;
    </ul>
  );
};

export default ListsList;
