import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});
