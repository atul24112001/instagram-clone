export const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
        userName: String!
    }

    type AuthResponse {
        message: String!
        id: ID!
        name: String!
        userName: String!
        email: String!
        token: String
    }
`;
