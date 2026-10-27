import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__afraPrisma ||
  new PrismaClient({ log: process.env.NODE_ENV === "development" ? ["error"] : ["error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.__afraPrisma = prisma;
