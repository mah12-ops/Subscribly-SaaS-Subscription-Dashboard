import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashed }
    });

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return res.json({ token });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return res.json({ token });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
// GET /api/me
export const me = async (req: Request, res: Response) => {
  try {
    // Assuming auth middleware sets req.user
    const userPayload = (req as any).user;
    if (!userPayload) return res.status(401).json({ error: "Not authenticated" });

    const user = await prisma.user.findUnique({
      where: { id: userPayload.id },
      include: {
        subscriptions: {
          include: {
            plan: true,
            invoice: true,
          },
        },
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json({ user });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
