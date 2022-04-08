import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const data = req.body;
  const { page } = req.query;
  const totalRecipes = parseInt(page) * 12;
  try {
    const result = await prisma.recipe.findMany({
      ...data,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ err: "Error occured while searching recipes." });
  }
};
