import { Request } from "express";

export interface Context {
  req: Request & { user?: { id: number; email: string; role: string } };
}

export const context = ({ req }: { req: Request }) => ({
  user: req.user || null,
});
