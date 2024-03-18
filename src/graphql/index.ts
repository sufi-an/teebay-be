import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import {Product} from './product'
import {Category} from './category'
import { Purchase } from "./purchase";

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
            ${User.typeDefs}
            ${Product.typeDefs}
            ${Category.typeDefs}
            ${Purchase.typeDefs}

            type Query {
               ${User.queries}
               ${Product.queries}
               ${Category.queries}
               ${Purchase.queries}

              }

            type Mutation {
               ${User.mutations}
               ${Product.mutations}
               ${Category.mutations}
               ${Purchase.mutations}
            }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Product.resolvers.queries,
        ...Category.resolvers.queries,
        ...Purchase.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Product.resolvers.mutations,
        ...Category.resolvers.mutations,
        ...Purchase.resolvers.mutations
      },
    },
  });

  // Start the gql server
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
