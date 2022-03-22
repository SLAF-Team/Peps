import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  try {
    const { id } = req.query;
    const result = await prisma.dish.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        dish: { select: { id: true, title: true, description: true, imageUrl: true, recipes: true, region: true, regionId: true } },
        },
      },
    );

    res.status(200).json(result);
  } catch (err) {
    console.log('$' * 100)
    console.log(err);
    console.log('$' * 100)

    res.status(400).json({ err: "Error while getting info." });
  }
};
