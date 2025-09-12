import { prisma } from "../prisma/client";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";

export const resolvers = {
  Query: {
    health: () => "ok",
    me: async (_: any, __: any, ctx: any) => {
      if (!ctx.user) return null;
      const id = (ctx.user as any).id;
      return prisma.user.findUnique({ where: { id } });
    },
    users: async () => prisma.user.findMany(),
    plans: async () => prisma.plan.findMany(),
    subscriptions: async () => prisma.subscription.findMany(),
  },

  Mutation: {
    signup: async (_: any, args: any) => {
      const existing = await prisma.user.findUnique({ where: { email: args.email } });
      if (existing) throw new Error("Email already in use");
      const hashed = await hashPassword(args.password);
      const user = await prisma.user.create({
        data: { name: args.name, email: args.email, password: hashed }
      });
      return signToken({ id: user.id, email: user.email, role: user.role });
    },

    login: async (_: any, args: any) => {
      const user = await prisma.user.findUnique({ where: { email: args.email } });
      if (!user) throw new Error("User not found");
      const ok = await comparePassword(args.password, user.password);
      if (!ok) throw new Error("Invalid credentials");
      return signToken({ id: user.id, email: user.email, role: user.role });
    },

    createPlan: async (_: any, args: any, ctx: any) => {
      if (!ctx.user || (ctx.user as any).role !== "ADMIN") throw new Error("Not authorized");
      return prisma.plan.create({
        data: {
          name: args.name,
          price: args.price,
          interval: args.interval,
          description: args.description || null,
        }
      });
    },

    subscribe: async (_: any, args: any, ctx: any) => {
      if (!ctx.user) throw new Error("Not authenticated");
      const userId = (ctx.user as any).id;
      // basic example: create subscription record (no stripe)
      const subscription = await prisma.subscription.create({
        data: {
          userId,
          planId: args.planId,
          status: "ACTIVE"
        }
      });
      return subscription;
    },

    cancelSubscription: async (_: any, args: any, ctx: any) => {
      if (!ctx.user) throw new Error("Not authenticated");
      // you may want to check subscription ownership in real app
      const updated = await prisma.subscription.update({
        where: { id: args.subscriptionId },
        data: { status: "CANCELLED" }
      });
      return updated;
    }
  },

  // resolver-level field resolvers (optional)
  Subscription: {
    user: (parent: any) => prisma.user.findUnique({ where: { id: parent.userId } }),
    plan: (parent: any) => prisma.plan.findUnique({ where: { id: parent.planId } })
  },

  User: {
    subscriptions: (parent: any) => prisma.subscription.findMany({ where: { userId: parent.id } })
  },

  Plan: {
    subscriptions: (parent: any) => prisma.subscription.findMany({ where: { planId: parent.id } })
  }
};
