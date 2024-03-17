export const typeDefs = `#graphql
    type Category {
    id: ID!
    name: String!
    slug: String!
    product: [Product]
    }
`;
