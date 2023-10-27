import express from "express";
import { graphqlHTTP } from "express-graphql";

import { ClientData } from "./@types";
import { trainingData, gymData } from "./helpers/constants.helper";

import { gql } from "apollo-server";
import { ApolloServer } from "apollo-server";
let clientsData: ClientData[] = [];

const typeDefs = gql`
  type Training {
    id: ID
    type: String
    price: Int
    gymId: Int
  }

  type Gym {
    id: ID
    name: String
    adminName: String
    adminPhone: String
    availableSlots: Int
  }

  type Customer {
    id: ID
    name: String
    email: String
    registers: [ID]
  }

  type Purchase {
    id: ID
    training: Training
    customerId: Int
    price: Int
    gymIncome: Int
  }

  type Purchases {
    id: ID
    trainings: [Training]
    customer: Customer
  }

  type Query {
    training: [Training]
    gym: [Gym]
    purchases(customerId: ID!): Purchases
  }

  type Mutation {
    purchaseTraining(trainingId: ID!): Purchase
  }
`;
const resolvers = {
  Query: {
    training: () => {
      return trainingData;
    },
    gym: () => {
      return gymData;
    },
    purchases: (parent: any, args: any) => {
      for (let i of clientsData) {
        if (i.id == args.customerId) {
          const out = [];
          for (let t of i.registers) {
            const training = trainingData.find((v) => t);
            if (training != undefined) {
              out.push(training);
            }
          }
          return {
            id: args.customerId,
            training: out,
            customer: i,
          };
        }
      }
    },
  },
  Mutation: {
    purchaseTraining: (parent: any, args: any) => {
      clientsData.push({
        id: clientsData.length,
        name: "client_name",
        email: "client_mail@mail.mail",
        registers: [args.trainingId],
      });
      const gymIncome: number =
        trainingData.find((v) => v.id == args.trainingId)?.price! * 0.8;

      return {
        id: clientsData.length,
        customerId: clientsData.length,
        price: 0,
        training: trainingData.find((v) => v.id == args.trainingId),
        gymIncome: gymIncome,
      };
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Сервер GraphQL готов по адресу ${url}`);
});
