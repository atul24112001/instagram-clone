import { ApolloServer } from "@apollo/server";
import { User } from "./user";
async function getGraphqlServer() {
  const server = new ApolloServer({
    typeDefs: `#graphql
      ${User.typeDefs}
      type Query {
        ${User.queries}
      }
      type Mutation {
        ${User.mutation}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });
  await server.start();
  return server;
}

export default getGraphqlServer;
