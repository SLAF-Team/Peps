import prisma from "../../../../lib/prisma.ts"

export default async (req, res) => {
  const {id} = req.query
  //récupérer l'ID
  try {
    const deleteComment = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(deleteComment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "Error occured while deleting a Recipe item." });
  }
};