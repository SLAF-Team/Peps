import prisma from "../../../../lib/prisma.ts";
import { checkAuth, checkIfAuthor } from "../../../../lib/auth";

export default async (req, res) => {
  const { id } = req.query;
  const listId = parseInt(id);

  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const isAuthor = await checkIfAuthor(req, "list", listId);
  if (!isAuthor) {
    res.status(403).json({ err: "Forbidden !!" });
    return;
  }

  try {
    const deleteList = await prisma.list.delete({
      where: {
        id: listId,
      },
    });
    res.status(200).json(deleteList);
  } catch (error) {
    res.status(400).json({ err: "Error occured while deleting a List item." });
  }
};
