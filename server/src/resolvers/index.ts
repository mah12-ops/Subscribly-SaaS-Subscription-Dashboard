import { prisma } from "../prisma/client";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";
import { signupSchema, loginSchema } from "../validation/auth";

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
    invoices: async (_: any, __: any, ctx: any) => {
    if (!ctx.user) throw new Error("Not authenticated");
    const userId = (ctx.user as any).id;

    return prisma.invoice.findMany({
      where: {
        subscription: {
          userId, // fetch only invoices for subscriptions of this user
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },
  },

  Mutation: {
   signup: async (_: any, args: any) => {
  const validated = signupSchema.parse(args); // throws if invalid
  const existing = await prisma.user.findUnique({ where: { email: validated.email } });
  if (existing) throw new Error("Email already in use");
  const hashed = await hashPassword(validated.password);
  const user = await prisma.user.create({
    data: { name: validated.name, email: validated.email, password: hashed }
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
      return prisma.subscription.create({
        data: {
          userId,
          planId: args.planId,
          status: "ACTIVE"
        }
      });
    },

    cancelSubscription: async (_: any, args: any, ctx: any) => {
      if (!ctx.user) throw new Error("Not authenticated");
      return prisma.subscription.update({
        where: { id: args.subscriptionId },
        data: { status: "CANCELLED" }
      });
    }
  },

  Subscription: {
    user: (parent: any) => prisma.user.findUnique({ where: { id: parent.userId } }),
    plan: (parent: any) => prisma.plan.findUnique({ where: { id: parent.planId } })
  },

  User: {
    subscriptions: (parent: any) => prisma.subscription.findMany({ where: { userId: parent.id } })
  },

  Plan: {
    subscriptions: (parent: any) => prisma.subscription.findMany({ where: { planId: parent.id } })
  },
  Invoice: {
  subscription: (parent: any) =>
    prisma.subscription.findUnique({ where: { id: parent.subscriptionId } }),
}

};
