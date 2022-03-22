import { checkAuth, checkIfCook } from "../../../lib/auth";
import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const data = req.body;

  try {
    const result = await prisma.dish.update({
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