import prisma from "../../../lib/prisma.ts";
import { checkAuth } from "../../../lib/auth";

export default async (req, res) => {
  console.log(req);
  // const isAuth = await checkAuth(req);
  // if (!isAuth) {
  //   res.status(403).json({ err: "Forbidden" });
  //   return;
  // }
  console.log("requête")
  console.log(req)
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
    res.status(400).json({ err: "Error while updating." });
  }
};
