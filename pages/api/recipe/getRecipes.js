import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  try {
    const result = await prisma.recipe.findMany({
      include: {
        cook: { select: { email: true, name: true, id: true } },
        _count: {select:{LikesOnRecipes: true}}
      },
    });

    res.status(200).json(result);
  } catch (err) {
    console.log('$' * 100)
    console.log(err);
    console.log('$' * 100)

    res.status(400).json({ err: "Error while getting info." });
  }
};
