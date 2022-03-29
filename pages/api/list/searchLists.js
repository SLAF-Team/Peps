import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const data = req.body
  try {
    const result = await prisma.list.findMany({
      ...data,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ err: "Error occured while searching list." });
  }
};
