import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const { id } = req.query;
  try {
    const deleteDish = await prisma.dish.delete({
      where: {
        id: Number.parseInt(id, 10),
      },
    });

    res.status(200).json(deleteDish);
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "Error occured while deleting a Dish item." });
  }
};