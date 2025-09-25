import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

// Apollo Client setup
export const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8080/graphql", // match backend endpoint
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
  role: string;
  avatar?: string;
  hasNewNotifications?: boolean;
  subscriptions: Subscription[];
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
  plan?: Plan;
  invoice?: Invoice[]; // ⚠️ match backend naming
}

export interface Invoice {
  id: string;
  amount: number;
  createdAt: string;
  pdfUrl?: string;
  subscription?: {
    id: string;
    status: string;
    plan?: {
      id: string;
      name: string;
    };
  };
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
      avatar
      hasNewNotifications
      subscriptions {
        id
        status
        plan { id name price interval }
        invoice { id amount createdAt pdfUrl }  # ⚠️ singular to match backend
      }
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
      invoice { id amount createdAt pdfUrl }  # ⚠️ singular
    }
  }
`;

export const GET_INVOICES = gql`
  query GetInvoices {
    me {
      id
      subscriptions {
        id
        status
        plan { id name price interval }
        invoice {  # ⚠️ singular
          id
          amount
          createdAt
          pdfUrl
          subscription {
            id
            status
            plan { id name }
          }
        }
      }
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
