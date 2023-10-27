"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymType = void 0;
const graphql_1 = require("graphql");
exports.GymType = new graphql_1.GraphQLObjectType({
    name: "Gym",
    fields: {
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        adminName: { type: graphql_1.GraphQLString },
        adminPhone: { type: graphql_1.GraphQLString },
        maxSlots: { type: graphql_1.GraphQLInt },
    },
});
