
export const mutations = `#graphql
    createCategory(name: String!, slug: String!,product: [String]): String
    updateCategory(id:String!,name: String!, slug: String!,product: [String]): String
    deleteCategory(id:String!): String



    `;
