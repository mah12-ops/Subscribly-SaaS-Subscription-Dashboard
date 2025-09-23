// src/api.ts
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

// Apollo Client setup
export const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8080/api/graphql", // ✅ your backend GraphQL endpoint
    credentials: "include", // if you use cookies/session
  }),
  cache: new InMemoryCache(),
});

// ----------------------
// GraphQL Types
// ----------------------
export interface Me {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  description?: string | null;
}

export interface Subscription {
  id: string;
  status: string;
  userId: string;
  planId: string;
  plan?: Plan;
}

export interface Invoice {
  id: string;
  amount: number;
  date: string;
  status: string;
}

// ----------------------
// Queries
// ----------------------
export const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      email
      role
    }
  }
`;

export const GET_PLANS = gql`
  query GetPlans {
    plans {
      id
      name
      price
      interval
      description
    }
  }
`;

export const GET_SUBSCRIPTIONS = gql`
  query GetSubscriptions {
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
`;

export const GET_INVOICES = gql`
  query GetInvoices {
    invoices {
      id
      amount
      date
      status
    }
  }
`;

// ----------------------
// Mutations
// ----------------------
export const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password)
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const SUBSCRIBE = gql`
  mutation Subscribe($planId: String!) {
    subscribe(planId: $planId) {
      id
      status
      plan {
        name
        price
      }
    }
  }
`;

export const CANCEL_SUBSCRIPTION = gql`
  mutation CancelSubscription($subscriptionId: String!) {
    cancelSubscription(subscriptionId: $subscriptionId) {
      id
      status
    }
  }
`;
