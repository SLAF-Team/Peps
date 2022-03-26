import prisma from "../../../../lib/prisma.ts";
import { checkAuth, checkIfAuthor } from "../../../../lib/auth";

export default async (req, res) => {
  const { id } = req.query;
  const commentId = parseInt(id);

  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const isAuthor = await checkIfAuthor(req, "comment", commentId);
  if (!isAuthor) {
    res.status(403).json({ err: "Forbidden !!" });
    return;
  }

  try {
    const deleteComment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    res.status(200).json(deleteComment);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ err: "Error occured while deleting a comment." });
  }
};
