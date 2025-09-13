import { prisma } from "./prisma/client";
import { verifyToken } from "./utils/jwt";

export type Context = {
  prisma: typeof prisma;
  user?: any | null;
};

export const createContext = ({ req }: { req: any }): Context => {
  const header = req.headers.authorization;
  let user = null;
  if (header) {
    const token = header.split(" ")[1];
    const payload = token ? verifyToken(token) : null;
    user = payload;
  }
  return { prisma, user };
};
