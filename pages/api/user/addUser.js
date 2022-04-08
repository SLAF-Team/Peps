import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma.ts";

const bcrypt = require("bcrypt");

export default async (req, res) => {
  const data = req.body;
  data.password = bcrypt.hashSync(data.password, 8);
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
      },
    });
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY
    );
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(403).json({ err: "Error occured while adding a new user." });
  }
};
