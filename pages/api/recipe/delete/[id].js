import prisma from "../../../../lib/prisma.ts"

export default async (req, res) => {
  const { id } = req.query;
  try {
    const deleteRecipe = await prisma.recipe.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(deleteRecipe);
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "Error occured while deleting a Recipe item." });
  }
};