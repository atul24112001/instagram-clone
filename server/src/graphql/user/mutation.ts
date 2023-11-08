export const mutation = `#graphql
    createUser(name: String!, email: String!, password: String!): AuthResponse,
    login(name: String!, email: String!, password: String!): AuthResponse,
`;
