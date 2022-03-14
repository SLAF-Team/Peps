// lib/prisma.ts

// creation d'un singletone - création au niveau du scope global de la variable prisma

import { PrismaClient } from "@prisma/client";

let prismatemp: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismatemp = new PrismaClient();
} else {
  if (!global.prismatemp) {
    global.prismatemp = new PrismaClient();
  }
  prismatemp = global.prismatemp;
}

const prisma = prismatemp;
export default prisma;
