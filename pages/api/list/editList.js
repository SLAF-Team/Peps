import prisma from "../../../lib/prisma.ts";
import { checkAuth, checkIfAuthor } from "../../../lib/auth";

export default async (req, res) => {
  const data = req.body;

  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const isAuthor = await checkIfAuthor(req, "list", data.id);
  if (!isAuthor) {
    res.status(403).json({ err: "Forbidden !!" });
    return;
  }

  try {
    const result = await prisma.list.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: "Error while updating." });
  }
};
