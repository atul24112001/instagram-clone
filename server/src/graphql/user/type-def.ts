export const typeDefs = `#graphql
 type User {
        id: ID!
        name: String!
        email: String!
    }

    type AuthResponse {
        message: String!
        status: Int!
        token: String
    }
`;
