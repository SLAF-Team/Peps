import React from "react";
import { Accordion } from "@mantine/core";
import CommentForm from "./../Comment/CommentForm";
import CommentsList from "./../Comment/CommentsList";
import classes from "./Comments.module.css";

const Comments = ({recipe, user, handleCommentUpdate}) => {

  return (
    <div className={classes.commentcontainer}>
      <p className={classes.h2}>Commenter</p>
      <CommentForm user={user} recipe={recipe} onCreate={handleCommentUpdate} />
      <br></br>
      {recipe?.comments.length != 0 && (
        <Accordion>
          <Accordion.Item
            label={"Voir les " + recipe?.comments.length + " commentaires"}
          >
            {recipe?.comments && (
              <CommentsList
                comments={recipe.comments}
                onDelete={handleCommentUpdate}
              />
            )}
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
};

export default Comments;
