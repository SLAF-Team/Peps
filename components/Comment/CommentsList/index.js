import CommentCard from "../CommentCard";

const CommentsList = ({ comments, setSubmitted }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <CommentCard comment={comment} key={index} setSubmitted={setSubmitted}/>
      ))}
    </>
  );
};
export default CommentsList;
