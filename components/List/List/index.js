import Link from "next/link";
import styles from "./List.module.css"
import moment from "moment";

const List = ({list}) => {
  return (
    <>
      <Link href={"/lists/" + list.id} exact>
        <div className="col-2 col-4-sm">
          <div className={styles.avatar}>
            <span className={styles.letter}>{list?.name[0].toUpperCase()}</span>
          </div>
        </div>
      </Link>
      <Link href={"/lists/" + list.id} exact>
        <div
          className="col-6 col-4-sm"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <p className={styles.listText}>{list.name}</p>
        </div>
      </Link>
      <Link href={"/lists/" + list.id} exact>
        <div
          className="col-4 col-4-sm"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <p className={styles.listText}>{moment(list.updatedAt).fromNow()}</p>
        </div>
      </Link>{" "}
    </>
  );
}

export default List