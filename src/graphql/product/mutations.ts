
export const mutations = `#graphql
    createProduct(title: String!, category: [String], description: String!, price: Float!, rentPrice:Float, rentType:String,userId: String! ): String
    updateProduct(id:String!,title: String, category: [String], description: String, price: Float, rentPrice:Float, rentType:String): String
    deleteProduct(id:String!): String!



    `;
