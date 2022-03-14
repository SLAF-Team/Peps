import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma.ts";
import { checkAuth } from "../../../lib/auth";

export default async (req, res) => {
  const isAuth = await checkAuth(req);
  if (!isAuth) {
    return;
  }

  const { authorization } = req.headers;
  const token = authorization.replace(/^Bearer\s/, "");

  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return false;
    }
    res.status(200).json({ user });
  } catch (err) {
    return false;
  }
};
