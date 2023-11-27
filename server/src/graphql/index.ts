import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Profile } from "./profile";
import { Post } from "./post";

async function getGraphqlServer() {
  const server = new ApolloServer({
    typeDefs: `#graphql
      ${User.typeDefs}
      ${Profile.typeDefs}
      ${Post.typeDefs}

      type Query {
        ${User.queries}
        ${Profile.queries}
        ${Post.queries}
      }
      type Mutation {
        ${User.mutation}
        ${Profile.mutation}
        ${Post.mutation}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Profile.resolvers.queries,
        ...Post.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Profile.resolvers.mutations,
        ...Post.resolvers.mutations,
      },
    },
  });
  await server.start();
  return server;
}

export default getGraphqlServer;
