import prisma from "../../../../lib/prisma.ts";
import { checkAuth, checkIfAdmin } from "../../../../lib/auth";

export default async (req, res) => {
  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const isAdmin = await checkIfAdmin(req);
  if (!isAdmin) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const { id } = req.query;
  try {
    const deleteDish = await prisma.dish.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(deleteDish);
  } catch (error) {
    res.status(400).json({ err: "Error occured while deleting a Dish item." });
  }
};
