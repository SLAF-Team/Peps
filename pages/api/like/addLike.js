import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const likesOnRecipes = await prisma.likesOnRecipes.create({
      data,
    });
    res.status(200).json(likesOnRecipes);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a like." });
  }
};
