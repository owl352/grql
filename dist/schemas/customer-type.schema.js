"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerType = void 0;
const graphql_1 = require("graphql");
exports.CustomerType = new graphql_1.GraphQLObjectType({
    name: "Customer",
    fields: {
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
    },
});
