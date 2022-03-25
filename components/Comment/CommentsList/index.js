import CommentCard from "../CommentCard";

const CommentsList = ({ comments, onDelete }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <CommentCard comment={comment} key={index} onDelete={onDelete} />
      ))}
    </>
  );
};
export default CommentsList;
