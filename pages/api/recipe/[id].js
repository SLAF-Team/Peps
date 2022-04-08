import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
<<<<<<< HEAD

=======
  console.log(req.query)
>>>>>>> 4c5acbdc1f5b299d1d9b38a6ceb20e00f78a3bdf
  try {
    const { id } = req.query;
    const result = await prisma.recipe.findUnique({
      where: { id: parseInt(id) },
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
        _count: { select: { likes: true, comments: true } },
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(400).json({ err: "Error while getting info." });
  }
};
