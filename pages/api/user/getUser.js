import prisma from "../../../lib/prisma.ts";

export default async (req, res) => {
  const data = req.body;
  try {
    const user = await prisma.user.findUnique({
      ...data,
    });
    if (!user) {
      res.status(400).json({ status: "error", error: "User Not Found" });
    } else {
      res.status(200).json({ user });
    }
  } catch (err) {
    res.status(403).json({ err: "Error occured while get a user." });
  }
};
