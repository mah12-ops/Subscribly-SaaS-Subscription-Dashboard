import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import authRoutes from "./routes/api";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./resolvers";
import { context } from "./context";

const PORT = process.env.PORT || 8080;

async function start() {
  const app: Application = express();

  // CORS
  const allowedOrigins =
    process.env.NODE_ENV === "production"
      ? ["https://yourfrontend.com"]
      : ["http://localhost:5173"];

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use("/api", authRoutes);

  // Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  await server.start();
  server.applyMiddleware({ app:app as any, path: "/graphql", cors: false });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

start().catch((err) => console.error("Server failed:", err));
