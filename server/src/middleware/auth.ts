import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request type to include 'user'
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: number; email: string; role: string } | null;
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Ensure decoded has id, email, role
    if (typeof decoded === "object" && decoded.id && decoded.email && decoded.role) {
      req.user = {
        id: Number(decoded.id),
        email: String(decoded.email),
        role: String(decoded.role),
      };
    } else {
      req.user = null;
    }
  } catch (err) {
    req.user = null;
  }

  next();
};
