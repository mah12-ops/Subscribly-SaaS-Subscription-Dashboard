import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum Role { USER ADMIN }
  enum Interval { MONTHLY YEARLY }
  enum SubscriptionStatus { ACTIVE CANCELLED EXPIRED }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    subscriptions: [Subscription!]!      # added non-nullable subscriptions
    createdAt: String!
    updatedAt: String!
  }

  type Plan {
    id: ID!
    name: String!
    price: Float!
    interval: Interval!
    description: String
    subscriptions: [Subscription!]!      # added subscriptions
    createdAt: String!
    updatedAt: String!
  }

  type Subscription {
    id: ID!
    user: User!
    plan: Plan!
    status: SubscriptionStatus!
    startDate: String!
    endDate: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    health: String!
    me: User                           # added me query
    users: [User!]!
    plans: [Plan!]!
    subscriptions: [Subscription!]!
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): String!   # returns JWT
    login(email: String!, password: String!): String!                 # returns JWT
    createPlan(name: String!, price: Float!, interval: Interval!, description: String): Plan!
    subscribe(planId: ID!): Subscription!
    cancelSubscription(subscriptionId: ID!): Subscription!
  }
`;
