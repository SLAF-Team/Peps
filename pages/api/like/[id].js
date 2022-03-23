import prisma from "../../../lib/prisma.ts";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  // console.log(req.headers);
  
  if (req.method !== 'DELETE') {
    console.log('insert some error message');
    return;
  }

  const { id } = req.query;
  
  const recipeId = Number.parseInt(id, 10);
  const { authorization } = req.headers;
  const token = authorization.replace(/^Bearer\s/, "");
  const { id: userId } = jwt.verify(token, process.env.JWT_KEY);

  try {
    const removeLike = await prisma.likesOnRecipes.delete({
      where: {
        userId_recipeId: { recipeId, userId }
      },
    });
    res.status(200).json(removeLike);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while removing a like." });
  }
};
