import CommentCard from "../CommentCard";

const CommentsList = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentCard comment={comment} />
      ))}
      ;
    </>
  );
};
export default CommentsList;
