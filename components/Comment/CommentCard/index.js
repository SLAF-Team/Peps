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

  async function updateComment() {
    const result = await axios.put(
      `/api/comment/editComment`,
      {
        text: text,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(result);
    // router.push("/recipes/");
  }

  const editComment = () => {
    console.log("coucou")
  }

  return (
    <div>
      <h3>{comment.user?.name}</h3>
      <p>{comment.text}</p>
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
            <Button
              label="Editer"
              type="warning"
              handleClick={() => editComment()}
              href="#"
              className={classes.button}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
