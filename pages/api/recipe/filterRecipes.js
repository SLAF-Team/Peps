import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const { data } = req.body;

  try {
    const result = await prisma.recipe.findMany({
      orderBy: {
        data: {
          _count: "asc",
        },
      },
      where: {
        lists: {
          some: { id: parseInt(id) },
        },
      },
      include: {
        lists: {
          select: { id: true, user: { select: { name: true, email: true } } },
        },
        _count: { select: { likes: true } },
        _count: { select: { comments: true } },
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: "Error while searching shacks." });
  }
};
