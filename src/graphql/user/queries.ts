export const queries = `#graphql
    login(email: String!, password: String!): String
    getCurrentLoggedInUser: User
    getAllUsers: [User]
`;
