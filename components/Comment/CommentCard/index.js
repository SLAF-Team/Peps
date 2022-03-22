import Button from "../../Button";
import classes from "./CommentCard.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../../context/UserContext";
import cross from "../../../assets/images/cross.svg";
import Image from "next/image";

const CommentCard = ({ comment }) => {
  const token = Cookies.get("token");
  const { user } = useUserContext();

  const isAuthor = comment.userId == user?.id ? true : false;

  // delete qui ne marche plus
  async function deleteComment() {
    if (window.confirm("Souhaitez vous supprimer ce commentaire?")) {
      await axios.delete(`/api/comment/delete/${comment?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // router.push("/recipes/");
    }
  }

  return (
      <div className={classes.modulecontainer}>
        <div className={classes.avatarcontainer}>
          <div
            className={classes.avatar}
            style={{ backgroundColor: "#ffd12f" }}
          >
            <span className={classes.letter}>
              {user?.name[0].toUpperCase()}
            </span>
          </div>
        </div>
        <div className={classes.textcontainer}>
          <p className={classes.commentauthor}>{comment.user?.name}</p>
          <p className={classes.commentauthor}>{comment.text}</p>
        </div>
        {isAuthor && (
          <div className={classes.editcontainer}>
            <Image src={cross} width={12} height={12} onClick={() => deleteComment()}/>
            <br></br>
          </div>
        )}
      </div>
  );
};

export default CommentCard;
