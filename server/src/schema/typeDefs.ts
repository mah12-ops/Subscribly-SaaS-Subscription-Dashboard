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
    avatar: String
    hasNewNotifications: Boolean!
    subscriptions: [Subscription!]!      
    createdAt: String!
    updatedAt: String!
  }

  type Plan {
    id: ID!
    name: String!
    price: Float!
    interval: Interval!
    description: String
    subscriptions: [Subscription!]!
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
    invoices: [Invoice!]! 
  }
 

  type Invoice {
    id: ID!
    amount: Float!
    pdfUrl: String
    createdAt: String!
     status: String!
    subscription: Subscription!
  }

  type Query {
    health: String!
    me: User
    users: [User!]!
    plans: [Plan!]!
    subscriptions: [Subscription!]!
    invoices: [Invoice!]!       # make sure this matches your resolver name
    activeSubscription: Subscription   
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): String!
    login(email: String!, password: String!): String!
    createPlan(name: String!, price: Float!, interval: Interval!, description: String): Plan!
    subscribe(planId: ID!): Subscription!
    cancelSubscription(subscriptionId: ID!): Subscription!
    updateProfile(name: String, avatar: String): User!
  }
`;
