import prisma from "../../../lib/prisma.ts";
import { checkAuth } from "../../../lib/auth";

<<<<<<< Updated upstream
export default async (req, res) => {
  const data = req.body;

  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  try {
    const recipe = await prisma.recipe.create({
=======
export default async (req, res) => {  
    const data = req.body;
    try {
      const recipe = await prisma.recipe.create({
>>>>>>> Stashed changes
      data: {
        ...data,
      },
    });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(403).json({ err: "Error occured while adding a new recipe." });
  }
};
