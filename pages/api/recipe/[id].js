import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  try {
    const { id } = req.query;
    const result = await prisma.recipe.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        dish: { select: { title: true, id: true } },
        cook: { select: { name: true } },
        likes: true,
        steps: true,
        comments: {
          include: {
            user: true,
          },
        },
        lists: {
          include: {
            user: true,
          },
        },
        ingredientsUnit: {
          include: {
            ingredient: { select: { name: true, id: true } },
            unit: { select: { name: true } },
          },
        },
        type: { select: { name: true, id: true } },
        tags: { select: { name: true, id: true } },
      },
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: "Error while getting info." });
  }
};
