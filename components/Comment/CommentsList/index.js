import CommentCard from "../CommentCard";

const CommentsList = ({ comments }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <CommentCard comment={comment} key={index} />
      ))}
    </>
  );
};
export default CommentsList;
