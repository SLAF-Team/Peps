import prisma from "../../../lib/prisma.ts";
import { checkAuth, checkIfUser } from "../../../lib/auth";

export default async (req, res) => {

    const data = req.body;

  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const isUser = await checkIfUser(req, data.id);
  if (!isUser) {
    res.status(403).json({ err: "Forbidden !!" });
    return;
  }
  try {
    const result = await prisma.user.update({
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