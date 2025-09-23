// src/api.ts
import { gql } from "@apollo/client";

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

// -------------------- GraphQL Mutations --------------------

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
