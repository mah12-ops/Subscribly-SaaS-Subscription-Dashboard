import { prisma } from "../prisma/client";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";
import { signupSchema, loginSchema } from "../validation/auth";

export const resolvers = {
  Query: {
    health: () => "ok",

    // Returns the current logged-in user with subscriptions and invoices
    me: async (_: any, __: any, ctx: any) => {
      if (!ctx.user) return null;
      const id = ctx.user.id;
      return prisma.user.findUnique({
        where: { id },
        include: {
          subscriptions: {
            include: { plan: true, invoices: true }, // invoices array
          },
        },
      });
    },

    // Returns all invoices of the current user
    invoices: async (_: any, __: any, ctx: any) => {
      if (!ctx.user) throw new Error("Not authenticated");
      const userId = ctx.user.id;
      return prisma.invoice.findMany({
        where: { subscription: { userId } },
        include: { subscription: { include: { plan: true } } },
        orderBy: { createdAt: "desc" },
      });
    },

    // Optional: get all users
    users: async () => prisma.user.findMany(),
    plans: async () => prisma.plan.findMany(),
    subscriptions: async () => prisma.subscription.findMany({ include: { plan: true, user: true } }),
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

    // Example: create a plan
    createPlan: async (_: any, args: any) => {
      const { name, price, interval, description } = args;
      return prisma.plan.create({
        data: { name, price, interval, description },
      });
    },

    // Subscribe a user to a plan
    subscribe: async (_: any, { planId }: any, ctx: any) => {
      if (!ctx.user) throw new Error("Not authenticated");
      return prisma.subscription.create({
        data: { userId: ctx.user.id, planId, status: "ACTIVE" },
        include: { plan: true, user: true },
      });
    },

    // Cancel a subscription
    cancelSubscription: async (_: any, { subscriptionId }: any, ctx: any) => {
      if (!ctx.user) throw new Error("Not authenticated");
      return prisma.subscription.update({
        where: { id: subscriptionId },
        data: { status: "CANCELLED" },
        include: { plan: true, user: true },
      });
    },

    // Update user profile
    updateProfile: async (_: any, args: any, ctx: any) => {
      if (!ctx.user) throw new Error("Not authenticated");
      const { name, avatar } = args;
      const updateData: any = {};
      if (name !== undefined) updateData.name = name;
      if (avatar !== undefined) updateData.avatar = avatar;
      
      return prisma.user.update({
        where: { id: ctx.user.id },
        data: updateData,
        include: {
          subscriptions: {
            include: { plan: true, invoices: true },
          },
        },
      });
    },
  },

  Subscription: {
    user: (parent: any) => prisma.user.findUnique({ where: { id: parent.userId } }),
    plan: (parent: any) => prisma.plan.findUnique({ where: { id: parent.planId } }),
  },

  User: {
    subscriptions: (parent: any) =>
      prisma.subscription.findMany({ where: { userId: parent.id }, include: { plan: true, invoices: true } }),
  },

  Invoice: {
    subscription: (parent: any) =>
      prisma.subscription.findUnique({ where: { id: parent.subscriptionId }, include: { plan: true } }),
  },
};
