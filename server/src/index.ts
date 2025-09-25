import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import authRoutes from "./routes/api";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./resolvers";
import { createContext } from "./context";
import { handleStripeWebhook } from "./controllers/webhook";
import rateLimit from "express-rate-limit";


const PORT = process.env.PORT ;

async function start() {
  const app: Application = express();

  // CORS: in production set origin to your frontend URL
 // Allow only your frontend in production
const allowedOrigins = process.env.NODE_ENV === "production"
  ? ["https://yourfrontend.com"]
  : ["http://localhost:5173"]; // dev frontend port

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


  // JSON body for REST endpoints
  app.use(express.json());

  // REST routes (health + auth)
  app.use("/api", authRoutes);


  // Rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                  // limit each IP to 10 requests per windowMs
  message: "Too many attempts from this IP, please try again later."
});

// Apply to auth-related endpoints
app.use("/graphql", (req, _res, next) => {
  if (req.body?.operationName === "login" || req.body?.operationName === "signup") {
    authLimiter(req, _res, next);
  } else next();
});

  // Stripe webhook endpoint needs raw body parsing (before other body parsers)
  app.post("/webhooks/stripe", bodyParser.raw({ type: "application/json" }), handleStripeWebhook);

  // Apollo GraphQL
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => createContext({ req })
  });

  await server.start();

  // cast to any to avoid type mismatch errors with some @types/express versions
  server.applyMiddleware({ app: app as any, path: "/graphql", cors: false });
  app.use((err: any, _req: any, res: any, _next: any) => {
  if (err?.issues) {
    return res.status(400).json({ errors: err.issues.map((i: any) => i.message) });
  }
  return res.status(500).json({ error: err.message || "Internal Server Error" });
});


  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${(server.graphqlPath)}`);
    console.log(`✅ REST health: http://localhost:${PORT}/api/health`);
  });
}

start().catch(err => {
  console.error("Failed to start server:", err);
});
