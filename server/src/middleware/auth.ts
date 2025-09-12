import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const attachUser = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return next();

  const token = header.split(" ")[1];
  if (!token) return next();

  const payload = verifyToken(token as string);
  if (payload) {
    // attach to req for other non-GraphQL routes (health, webhooks)
    (req as any).user = payload;
  }
  return next();
};
