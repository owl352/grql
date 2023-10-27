import { GraphQLID, GraphQLInt, GraphQLObjectType } from "graphql";
export const PurchaseType = new GraphQLObjectType({
  name: "Purchase",
  fields: {
    id: { type: GraphQLID },
    trainingId: { type: GraphQLID },
    customerId: { type: GraphQLID },
    price: { type: GraphQLInt },
    gymIncome: { type: GraphQLInt },
  },
});
