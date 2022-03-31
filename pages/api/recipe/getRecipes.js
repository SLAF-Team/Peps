import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const { page } = req.query;
  const totalRecipes = parseInt(page) * 9;
  try {
    const result = await prisma.recipe.findMany({
      take: totalRecipes,
      include: {
        cook: { select: { email: true, name: true, id: true } },
        _count: { select: { likes: true, comments: true } },
        type: { select: { name: true } },
      },
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: "Error while getting info." });
  }
};
