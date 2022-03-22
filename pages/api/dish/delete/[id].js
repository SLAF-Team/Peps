import prisma from "../../../../lib/prisma.ts";
import { checkAuth, checkIfCook } from "../../../../lib/auth";

export default async (req, res) => {
  
  const isAuth = await checkAuth(req);
  if(!isAuth){
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const isTheOwner = await checkIfCook(req, req.body.ownerId);
  if (!isTheOwner) {
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
    console.log(error);
    res.status(400).json({ err: "Error occured while deleting a Dish item." });
  }
};