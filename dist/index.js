"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const constants_helper_1 = require("./helpers/constants.helper");
const gym_type_schema_1 = require("./schemas/gym-type.schema");
const purchase_type_schema_1 = require("./schemas/purchase-type.schema");
const training_type_schema_1 = require("./schemas/training-type.schema");
let clientsData = [];
let gymSlots = Array.from({ length: constants_helper_1.gymData.length }, (_, i) => {
    return {
        id: constants_helper_1.gymData[i].id,
        freeSlots: constants_helper_1.gymData[i].maxSlots,
    };
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        training: {
            type: new graphql_1.GraphQLList(training_type_schema_1.TrainingType),
            resolve() {
                return constants_helper_1.trainingData;
            },
        },
        gym: {
            type: new graphql_1.GraphQLList(gym_type_schema_1.GymType),
            resolve() {
                return constants_helper_1.gymData;
            },
        },
        purchases: {
            type: new graphql_1.GraphQLObjectType({
                name: "purchases",
                fields: {
                    id: { type: graphql_1.GraphQLID },
                    trainings: { type: new graphql_1.GraphQLList(graphql_1.GraphQLInt) },
                },
            }),
            args: {
                customerId: { type: graphql_1.GraphQLID },
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
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        purchaseTraining: {
            type: purchase_type_schema_1.PurchaseType,
            args: {
                trainingId: { type: graphql_1.GraphQLID },
            },
            resolve: function (_, { trainingId }) {
                var _a;
                clientsData.push({
                    id: clientsData.length,
                    name: "client_name",
                    email: "client_mail@mail.mail",
                    registers: [trainingId],
                });
                const gymIncome = ((_a = constants_helper_1.trainingData.find((v) => v.id == trainingId)) === null || _a === void 0 ? void 0 : _a.price) * 0.8;
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
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
const app = (0, express_1.default)();
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema,
    graphiql: true,
}));
app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000, () => {
    var _a;
    console.log(`Сервер GraphQL запущен на порту ${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000}`);
});
