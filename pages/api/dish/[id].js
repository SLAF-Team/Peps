import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  try {
    const { id } = req.query;
    const result = await prisma.dish.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        recipes: true,
        region: true,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: "Error while getting info." });
  }
};
