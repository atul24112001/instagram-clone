import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import getGraphqlServer from "./graphql";
import { context } from "./utils/context";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT;

  app.use(express.json({ limit: "10mb" }));
  app.use(cors());

  const server = await getGraphqlServer();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: context,
    })
  );

  app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
}

config();
startServer();