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

export const checkIfAuthor = async (request, model, id) => {
  const { authorization } = request.headers;
  const token = authorization.replace(/^Bearer\s/, "");
  const element = await prisma[model].findUnique({
    where: { id },
  });
  try {
    const user_id = jwt.verify(token, process.env.JWT_KEY).id;
    if (user_id !== element.userId) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const checkIfUser = async (request, id) => {
  const { authorization } = request.headers;
  const token = authorization.replace(/^Bearer\s/, "");
  const user = await prisma.user.findUnique({
    where: { id },
  });
  try {
    const user_id = jwt.verify(token, process.env.JWT_KEY).id;
    if (user_id !== user.id) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
