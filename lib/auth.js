import prisma from "./prisma.ts";
import jwt from "jsonwebtoken";

export const checkAuth = async (request) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return false;
  }
  const token = authorization.replace(/^Bearer\s/, "");

  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    if (!id) {
      return false;
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};

export const checkIfCook = async (request) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return false;
  }
  const token = authorization.replace(/^Bearer\s/, "");
  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user.iscook) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};

export const checkIfAdmin = async (request) => {
  const { authorization } = request.headers;
  const token = authorization.replace(/^Bearer\s/, "");
  const { id } = jwt.verify(token, process.env.JWT_KEY);

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user.isadmin) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};

// export const checkIfCookIsMe = async (request, id) => {
//   const { authorization } = request.headers;
//   if (!authorization) {
//     return false;
//   }
//   const token = authorization.replace(/^Bearer\s/, "");
//   try {
//     const user_id = jwt.verify(token, process.env.JWT_KEY).id;
//     if (user_id !== id) {
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
//   return true;
// };
