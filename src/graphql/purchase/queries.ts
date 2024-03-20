export const queries = `#graphql
getAllPurchaseByUser(buyerId:String!): [Purchase]
getAllSalesByUser(sellerId:String!): [Purchase]
`;
