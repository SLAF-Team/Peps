import prisma from "../../../lib/prisma.ts";
import { checkAuth } from "../../../lib/auth";

export default async (req, res) => {
  const isAuth = await checkAuth(req);
  if(!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const data = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new comment." });
  }
};
