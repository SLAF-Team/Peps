import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const ingredientsandrecipes = await prisma.ingredientsandrecipes.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(ingredientsandrecipes);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new recipe." });
  }
};
