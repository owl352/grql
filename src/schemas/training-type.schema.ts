import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const TrainingType = new GraphQLObjectType({
  name: "Training",
  fields: {
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    price: { type: GraphQLInt },
    gymId: { type: GraphQLID },
  },
});
