import prisma from "../../../lib/prisma.ts";
import { checkAuth } from "../../../lib/auth";

export default async (req, res) => {
  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }
  const data = req.body;
  try {
    const list = await prisma.list.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(list);
  } catch (err) {
    res.status(403).json({ err: "Error occured while adding a new list" });
  }
};
