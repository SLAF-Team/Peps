import CommentCard from "../CommentCard";

const CommentsList = ({ comments, setDeleted }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <CommentCard comment={comment} key={index} setDeleted={setDeleted} />
      ))}
    </>
  );
};
export default CommentsList;
