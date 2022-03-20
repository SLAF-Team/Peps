const CommentCard = ({ comment }) => {
  return (
    <>
      <h3>{comment.user.name}</h3>
      <p>{comment.text}</p>
    </>
  );
};

export default CommentCard;
