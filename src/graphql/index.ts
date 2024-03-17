import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import {Product} from './product'
import {Category} from './category'

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
            ${User.typeDefs}
            ${Product.typeDefs}
            ${Category.typeDefs}

            type Query {
               ${User.queries}
               ${Product.queries}
               ${Category.queries}
            }

            type Mutation {
               ${User.mutations}
               ${Product.mutations}
               ${Category.mutations}
            }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Product.resolvers.queries,
        ...Category.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Product.resolvers.mutations,
        ...Category.resolvers.mutations
      },
    },
  });

  // Start the gql server
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
