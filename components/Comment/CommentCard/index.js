import classes from "./CommentCard.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../../context/UserContext";
import moment from "moment";
import { useNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";

const CommentCard = ({ comment, setDeleted }) => {
  const router = useRouter();
  const token = Cookies.get("token");
  const { user } = useUserContext();
  const notifications = useNotifications();
  const isAuthor = comment.userId == user?.id ? true : false;
  const recipeId = comment.recipeId;

  async function deleteComment() {
    await axios.delete(`/api/comment/delete/${comment?.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleted(true);
    notifications.showNotification({
      title: "Bravo",
      message: "Votre commentaire a bien été supprimé.",
      color: "red",
    });
  }

  return (
    <div className={classes.modulecontainer}>
      <div className={classes.avatarcontainer}>
        <div className={classes.avatar} style={{ backgroundColor: "#ffd12f" }}>
          <span className={classes.letter}>
            {comment?.user.name[0].toUpperCase()}
          </span>
        </div>
      </div>
      <div className={classes.textcontainer}>
        <p className={classes.commentauthor}>
          {comment.user?.name} - {moment(comment?.createdAt).fromNow()} -{" "}
          {isAuthor && (
            <>
              <a onClick={() => deleteComment()}>supprimer</a>
            </>
          )}
        </p>
        <p className={classes.commentCorpus}>{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentCard;
