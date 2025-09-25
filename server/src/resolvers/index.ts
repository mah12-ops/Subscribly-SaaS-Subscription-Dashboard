import { prisma } from "../prisma/client";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";
import { signupSchema, loginSchema } from "../validation/auth";

export const resolvers = {
  Query: {
    health: () => "ok",

    me: async (_: any, __: any, ctx: any) => {
      if (!ctx.user) return null;
      const id = ctx.user.id;
      return prisma.user.findUnique({
        where: { id },
        include: {
          subscriptions: {
            include: { plan: true, invoice: true },
          },
        },
      });
    },

    invoices: async (_: any, __: any, ctx: any) => {
      if (!ctx.user) throw new Error("Not authenticated");
      const userId = ctx.user.id;
      return prisma.invoice.findMany({
        where: { subscription: { userId } },
        include: { subscription: { include: { plan: true } } },
        orderBy: { createdAt: "desc" },
      });
    },
  },

  Mutation: {
    signup: async (_: any, args: any) => {
      const validated = signupSchema.parse(args);
      const existing = await prisma.user.findUnique({ where: { email: validated.email } });
      if (existing) throw new Error("Email already in use");
      const hashed = await hashPassword(validated.password);
      const user = await prisma.user.create({
        data: { name: validated.name, email: validated.email, password: hashed },
      });
      return signToken({ id: user.id, email: user.email, role: user.role });
    },

    login: async (_: any, args: any) => {
      const validated = loginSchema.parse(args);
      const user = await prisma.user.findUnique({ where: { email: validated.email } });
      if (!user) throw new Error("User not found");
      const ok = await comparePassword(validated.password, user.password);
      if (!ok) throw new Error("Invalid credentials");
      return signToken({ id: user.id, email: user.email, role: user.role });
    },
  },

  Subscription: {
    user: (parent: any) => prisma.user.findUnique({ where: { id: parent.userId } }),
    plan: (parent: any) => prisma.plan.findUnique({ where: { id: parent.planId } }),
  },

  User: {
    subscriptions: (parent: any) =>
      prisma.subscription.findMany({ where: { userId: parent.id }, include: { plan: true, invoice: true } }),
  },

  Invoice: {
    subscription: (parent: any) =>
      prisma.subscription.findUnique({ where: { id: parent.subscriptionId }, include: { plan: true } }),
  },
};
