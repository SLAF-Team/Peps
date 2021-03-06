import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  try {
    const result = await prisma.list.findMany({
      include: {
        recipes: true,
        user: { select: { name: true } },
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: "Error while getting lists." });
  }
};
