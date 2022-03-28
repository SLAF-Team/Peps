import prisma from "../../../lib/prisma.ts";
import { checkAuth, checkIfUser } from "../../../lib/auth";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const { authorization } = req.headers;
  const token = authorization.replace(/^Bearer\s/, "");
  const { id } = jwt.verify(token, process.env.JWT_KEY);

  const isUser = await checkIfUser(req, id);
  if (!isUser) {
    res.status(403).json({ err: "Forbidden !!" });
    return;
  }

  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(403).json({ err: "Error occured while deleting a user." });
  }
};
