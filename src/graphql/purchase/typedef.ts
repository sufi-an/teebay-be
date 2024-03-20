export const typeDefs = `#graphql
    type Purchase {
    id: ID!
    product: Product!
    buyer: User!
    seller: User!
    
    }
`;
