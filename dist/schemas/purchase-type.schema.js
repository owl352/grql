"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseType = void 0;
const graphql_1 = require("graphql");
exports.PurchaseType = new graphql_1.GraphQLObjectType({
    name: "Purchase",
    fields: {
        id: { type: graphql_1.GraphQLID },
        trainingId: { type: graphql_1.GraphQLID },
        customerId: { type: graphql_1.GraphQLID },
        price: { type: graphql_1.GraphQLInt },
        gymIncome: { type: graphql_1.GraphQLInt },
    },
});
