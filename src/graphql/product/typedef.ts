export const typeDefs = `#graphql
    type Product {
        id: ID!
        title: String!
        category: [Category]
        description: String!
        price: Float!
        rentPrice:Float
        rentType: String
    }

`;
