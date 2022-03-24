import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const data = req.body
  try {
    const result = await prisma.dish.findMany({
      ...data,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while searching recipes." });
  }
};