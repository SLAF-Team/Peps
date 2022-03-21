import Button from "../../Button";
import classes from "./CommentCard.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../../context/UserContext";

const CommentCard = ({ comment }) => {
  const token = Cookies.get("token");
  const { user } = useUserContext();

  //todo
  // Ajouter un routing nested
  // Ajouter update
  // CSS

  const isAuthor = comment.userId == user?.id ? true : false;

  async function deleteComment() {
    if (window.confirm("Souhaitez vous supprimer ce commentaire?")) {
      await axios.delete(`/api/comment/delete/${comment?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // router.push("/recipes/");
    }
  }

  return (
    <div>
      <div className={classes.modulecontainer}>
        <div className={classes.avatar} style={{ backgroundColor: "#ffd12f" }}>
          <span className={classes.letter}>{user?.name[0].toUpperCase()}</span>
        </div>
        <div className={classes.textcontainer}>
          <p className={classes.commentauthor}>{comment.user?.name}</p>
          <p className={classes.commentauthor}>{comment.text}</p>
        </div>
      </div>
      {isAuthor && (
        <div className={classes.detailscontainer}>
          <div className={classes.editcontainer}>
            <Button
              label="Supprimer"
              type="danger"
              handleClick={() => deleteComment()}
              href="#"
              className={classes.button}
            />
            <br></br>
            {/* <Button
              label="Editer"
              type="warning"
              handleClick={() => editComment()}
              href="#"
              className={classes.button}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
