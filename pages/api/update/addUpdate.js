import prisma from "../../../lib/prisma.ts";
import { checkAuth } from "../../../lib/auth";

export default async (req, res) => {
  const data = req.body;

  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  try {
    const updatesOnDish = await prisma.updatesOnDish.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(updatesOnDish);
  } catch (err) {
    res.status(403).json({ err: "Error occured while adding a like." });
  }
};
