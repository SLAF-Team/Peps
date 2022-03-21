import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  try {
    const { id } = req.query;
    const result = await prisma.recipe.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        dish: { select: { title: true } },
        cook: { select: { name: true } },
        likes: true,
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
            ingredient: { select: { name: true } },
            unit: { select: { name: true } },
          },
        },
        type: { select: { name: true } },
        tags: { select: { name: true } },
      },
    });

    res.status(200).json(result);
  } catch (err) {
    console.log("$" * 100);
    console.log(err);
    console.log("$" * 100);

    res.status(400).json({ err: "Error while getting info." });
  }
};
