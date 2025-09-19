// src/api.ts
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8080/graphql", // your backend GraphQL endpoint
    credentials: "include", // if you use cookies/session
  }),
  cache: new InMemoryCache(),
});


// -------------------- GraphQL Queries --------------------

// Get all subscriptions of the logged-in user
export const GET_SUBSCRIPTIONS = gql`
  query GetSubscriptions {
    me {
      id
      subscriptions {
        id
        status
        plan {
          id
          name
          price
          interval
        }
      }
    }
  }
`;

// Subscribe to a plan
export const SUBSCRIBE_PLAN = gql`
  mutation Subscribe($planId: Int!) {
    subscribe(planId: $planId) {
      id
      status
      plan {
        id
        name
        price
        interval
      }
    }
  }
`;

// Cancel a subscription
export const CANCEL_SUBSCRIPTION = gql`
  mutation Cancel($subscriptionId: Int!) {
    cancelSubscription(subscriptionId: $subscriptionId) {
      id
      status
    }
  }
`;
