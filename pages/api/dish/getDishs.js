import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  try {
    const result = await prisma.dish.findMany({
      include: { recipes: { select: {name: true, description: true, id: true } } }
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: "Error while getting info." });
  }
};
