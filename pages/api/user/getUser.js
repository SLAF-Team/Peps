import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma.ts";
const bcrypt = require("bcrypt");

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        error: "missing email or password",
      });
    } else {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        res.status(400).json({ status: "error", error: "User Not Found" });
      } else {
        bcrypt.compare(password, user.password).then((isMatch) => {
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_KEY
          );
          res.status(200).json({ user, token });
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new user." });
  }
};
