import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// HTTP Link
const httpLink = new HttpLink({ uri: "http://localhost:8080/graphql", credentials: "include" });

// Auth Link: attach JWT from localStorage
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token"); // Make sure you save token after login/signup
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Apollo Client
export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
