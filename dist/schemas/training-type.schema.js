"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingType = void 0;
const graphql_1 = require("graphql");
exports.TrainingType = new graphql_1.GraphQLObjectType({
    name: "Training",
    fields: {
        id: { type: graphql_1.GraphQLID },
        type: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt },
        gymId: { type: graphql_1.GraphQLID },
    },
});
