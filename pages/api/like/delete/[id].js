import prisma from "../../../../lib/prisma.ts";
import jwt from "jsonwebtoken";
import { checkAuth } from "../../../../lib/auth";

export default async (req, res) => {
  const { id } = req.query;
  const recipeId = parseInt(id);

  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const { authorization } = req.headers;
  const token = authorization.replace(/^Bearer\s/, "");
  const { id: userId } = jwt.verify(token, process.env.JWT_KEY);

  try {
    const removeLike = await prisma.likesOnRecipes.delete({
      where: {
        userId_recipeId: { recipeId, userId },
      },
    });
    res.status(200).json(removeLike);
  } catch (err) {
    res.status(403).json({ err: "Error occured while removing a like." });
  }
};
