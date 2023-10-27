import express from "express";
import { graphqlHTTP } from "express-graphql";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
} from "graphql";
import { ClientData } from "./@types";
import { trainingData, gymData } from "./helpers/constants.helper";
import { GymType } from "./schemas/gym-type.schema";
import { PurchaseType } from "./schemas/purchase-type.schema";
import { TrainingType } from "./schemas/training-type.schema";

let clientsData: ClientData[] = [];

let gymSlots = Array.from({ length: gymData.length }, (_, i) => {
  return {
    id: gymData[i].id,
    freeSlots: gymData[i].maxSlots,
  };
});


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    training: {
      type: new GraphQLList(TrainingType),
      resolve() {
        return trainingData;
      },
    },
    gym: {
      type: new GraphQLList(GymType),
      resolve() {
        return gymData;
      },
    },
    purchases: {
      type: new GraphQLObjectType({
        name: "purchases",
        fields: {
          id: { type: GraphQLID },
          trainings: { type: new GraphQLList(GraphQLInt) },
        },
      }),
      args: {
        customerId: { type: GraphQLID },
      },
      resolve(_, { customerId }) {
        for (let i of clientsData) {
          if (i.id == customerId) {
            return {
              id: customerId,
              trainings: i.registers,
            };
          }
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    purchaseTraining: {
      type: PurchaseType,
      args: {
        trainingId: { type: GraphQLID },
      },
      resolve: function (_, { trainingId }) {
        clientsData.push({
          id: clientsData.length,
          name: "client_name",
          email: "client_mail@mail.mail",
          registers: [trainingId],
        });
        const gymIncome: number =
          trainingData.find((v) => v.id == trainingId)?.price! * 0.8;
        return {
          id: clientsData.length,
          trainingId: trainingId,
          customerId: clientsData.length,
          price: 0,
          gymIncome: gymIncome,
        };
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT??4000, () => {
  console.log("Сервер GraphQL запущен на порту 4000");
});
