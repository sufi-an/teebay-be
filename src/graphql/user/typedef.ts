export const typeDefs = `#graphql
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        address: String!
        email: String!
        phoneNo:String!

        purchases:[Purchase]
        sales:[Purchase]
        borrows:[Rent]
        lends:[Rent]
    }
`;
