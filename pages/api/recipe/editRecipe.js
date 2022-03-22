import prisma from "../../../lib/prisma.ts";
import { checkAuth, checkIfCook } from "../../../lib/auth";

export default async (req, res) => {
  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const isTheOwner = await checkIfCook(req, req.body.ownerId);
  if (!isTheOwner) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const data = req.body;
  try {
    const result = await prisma.recipe.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(400).json({ err: "Error while updating." });
  }
};
