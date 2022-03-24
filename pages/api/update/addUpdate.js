import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const data = req.body
  
  try {
    const updatesOnDish = await prisma.updatesOnDish.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(updatesOnDish);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a like." });
  }
};
