import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const GymType = new GraphQLObjectType({
  name: "Gym",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    adminName: { type: GraphQLString },
    adminPhone: { type: GraphQLString },
    maxSlots: { type: GraphQLInt },
  },
});
