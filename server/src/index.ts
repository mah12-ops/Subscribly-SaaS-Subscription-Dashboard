import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import apiRoutes from "./routes/api";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./resolvers";
import { createContext } from "./context";
import { handleStripeWebhook } from "./controllers/webhook";

const PORT = process.env.PORT || 4000;

async function start() {
  const app: Application = express();

  // CORS: in production set origin to your frontend URL
  app.use(cors({ origin: true, credentials: true }));

  // JSON body for REST endpoints
  app.use(express.json());

  // REST routes (health + auth)
  app.use("/api", apiRoutes);

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

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${(server.graphqlPath)}`);
    console.log(`✅ REST health: http://localhost:${PORT}/api/health`);
  });
}

start().catch(err => {
  console.error("Failed to start server:", err);
});
