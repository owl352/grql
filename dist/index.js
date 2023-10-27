"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_helper_1 = require("./helpers/constants.helper");
const apollo_server_1 = require("apollo-server");
const apollo_server_2 = require("apollo-server");
let clientsData = [];
const typeDefs = (0, apollo_server_1.gql) `
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
            return constants_helper_1.trainingData;
        },
        gym: () => {
            return constants_helper_1.gymData;
        },
        purchases: (parent, args) => {
            for (let i of clientsData) {
                if (i.id == args.customerId) {
                    const out = [];
                    for (let t of i.registers) {
                        const training = constants_helper_1.trainingData.find((v) => t);
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
        purchaseTraining: (parent, args) => {
            var _a;
            clientsData.push({
                id: clientsData.length,
                name: "client_name",
                email: "client_mail@mail.mail",
                registers: [args.trainingId],
            });
            const gymIncome = ((_a = constants_helper_1.trainingData.find((v) => v.id == args.trainingId)) === null || _a === void 0 ? void 0 : _a.price) * 0.8;
            return {
                id: clientsData.length,
                customerId: clientsData.length,
                price: 0,
                training: constants_helper_1.trainingData.find((v) => v.id == args.trainingId),
                gymIncome: gymIncome,
            };
        },
    },
};
const server = new apollo_server_2.ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`Сервер GraphQL готов по адресу ${url}`);
});
