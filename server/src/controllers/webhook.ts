import { Request, Response } from "express";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
const stripe = (process.env.STRIPE_SECRET_KEY) ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" }) : null;

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const raw = req.body as Buffer; // bodyParser.raw provided in index.ts
  const sig = req.headers["stripe-signature"] as string | undefined;

  if (!stripe || !stripeSecret || !sig) {
    // If stripe not configured, accept and return
    return res.status(200).send({ received: true, note: "stripe not configured" });
  }

  try {
    const event = stripe.webhooks.constructEvent(raw, sig, stripeSecret);
    // handle specific events here, e.g. checkout.session.completed
    console.log("Stripe event received:", event.type);
    // TODO: map to DB changes using prisma
    res.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
