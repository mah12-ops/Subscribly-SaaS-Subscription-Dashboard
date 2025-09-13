import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

// attachUser: attach decoded token payload to req.user if present
export const attachUser = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return next();

  const token = header.split(" ")[1];
  if (!token) return next();

  const payload = verifyToken(token as string);
  if (payload) {
    (req as any).user = payload;
  }
  return next();
};
