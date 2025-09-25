import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import {  SetContextLink } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql", // ✅ FIX: remove /api
});

const authLink = new SetContextLink((_: any, { headers }: any) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
