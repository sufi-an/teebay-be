export const queries = `#graphql
getAllRentByUser(lenderId:String!): [Rent]
getAllBorrowByUser(borrowerId:String!): [Rent]
`;
