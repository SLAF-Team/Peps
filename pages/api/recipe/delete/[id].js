import prisma from "../../../../lib/prisma.ts";
import { checkAuth, checkIfAuthor } from "../../../../lib/auth";

export default async (req, res) => {
  const { id } = req.query;
  const recipeId = parseInt(id);

  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const isAuthor = await checkIfAuthor(req, "recipe", recipeId);
  if (!isAuthor) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  try {
    const deleteRecipe = await prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });
    res.status(200).json(deleteRecipe);
  } catch (error) {
    res
      .status(400)
      .json({ err: "Error occured while deleting a Recipe item." });
  }
};
