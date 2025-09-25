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
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;                  // optional
  hasNewNotifications?: boolean;   // optional
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
  userId: string;
  planId: string;
  plan?: Plan;

}
interface Invoice {
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
      avatar        # <-- Add this to your Prisma User model
      hasNewNotifications 
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
const GET_INVOICES = gql`
  query GetInvoices {
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
        invoices {
          id
          amount
          createdAt
          pdfUrl
          subscription {
            id
            status
            plan {
              id
              name
            }
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
