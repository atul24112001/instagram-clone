import { ApolloClient, InMemoryCache } from "@apollo/client";

export const API_URL = import.meta.env.VITE_API_URL;

export const apolloClient = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
  headers: {
    token: localStorage.getItem("token") ?? "",
  },
});
