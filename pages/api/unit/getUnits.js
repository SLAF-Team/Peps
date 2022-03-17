import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  try {
    const result = await prisma.unit.findMany();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: "Error while getting info." });
  }
};
