import Button from "../../Button";
import classes from "./CommentCard.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../../context/UserContext";
import cross from "../../../assets/images/cross.SVG";
import Image from "next/image";
import moment from "moment";
import { useNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";

const CommentCard = ({ comment }) => {
  const router = useRouter();
  const token = Cookies.get("token");
  const { user } = useUserContext();
  const notifications = useNotifications();
  const isAuthor = comment.userId == user?.id ? true : false;
  const recipeId = comment.recipeId;
  console.log("isAuthor");

  console.log(isAuthor);

  async function deleteComment() {
    if (window.confirm("Souhaitez vous supprimer ce commentaire?")) {
      await axios.delete(`/api/comment/delete/${comment?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push(`/recipes/${recipeId}`);
      notifications.showNotification({
        title: "Bravo",
        message: "Votre commentaire a bien été supprimé.",
        color: "red",
      });
    }
  }

  return (
    <div className={classes.modulecontainer}>
      <div className={classes.avatarcontainer}>
        <div className={classes.avatar} style={{ backgroundColor: "#ffd12f" }}>
          <span className={classes.letter}>{user?.name[0].toUpperCase()}</span>
        </div>
      </div>
      <div className={classes.textcontainer}>
        <p className={classes.commentauthor}>
          {comment.user?.name} - {moment(comment?.createdAt).fromNow()}
        </p>
        <p className={classes.commentCorpus}>{comment.text}</p>
      </div>
      {isAuthor && (
        <div className={classes.editcontainer}>
          <Image
            src={cross}
            width={12}
            height={12}
            onClick={() => deleteComment()}
          />
          <br></br>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
