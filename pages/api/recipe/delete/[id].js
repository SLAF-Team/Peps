import prisma from "../../../../lib/prisma.ts"
import { checkAuth } from "../../../../lib/auth";

export default async (req, res) => {
  const isAuth = await checkAuth(req);
  if(!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const { id } = req.query;
  try {
    const deleteRecipe = await prisma.recipe.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(deleteRecipe);
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "Error occured while deleting a Recipe item." });
  }
};