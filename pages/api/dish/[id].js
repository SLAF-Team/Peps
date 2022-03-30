import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  try {
    const { id } = req.query;
    const { page } = req.query;
    const totalRecipes = parseInt(page) * 9;
    const result = await prisma.dish.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        updates: {
          include: {
            user: { select: { name: true, id: true } },
          },
        },
        region: true,
        recipes: {
          take: totalRecipes,
          include: {
            _count: { select: { likes: true, comments: true } },
          },
        },
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: "Error while getting info." });
  }
};
