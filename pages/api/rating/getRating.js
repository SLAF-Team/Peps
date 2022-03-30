import prisma from "../../../lib/prisma.ts";


export default async (req, res) => {
    con
  try {
    const result = await prisma.rating.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
        rating: true,
        recipes: { select: { id: true } },
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: "Error while getting lists." });
  }
};

