import ProductService, { CreateProductPayload, UpdateProdductPayload } from "../../services/product";
// getUserToken
const queries = {
  getProductByUser: async (_: any, parameters: any, context: any) => {
    // console.log(parameters,context)
    const products = await ProductService.getProductByUser(parameters.userId);
      return products;
    // throw new Error("I dont know who are you");
    // return 'Product list'
  },

};

const mutations = {
  createProduct: async (_: any, payload: CreateProductPayload) => {

    const res = await ProductService.createProduct(payload);
    return res.id;

  },
  updateProduct:async (_: any, payload: UpdateProdductPayload) => {

    const res = await ProductService.updateProduct(payload);
    return res.id;

  },
  deleteProduct:async (_: any, parameters: any) => {
    
    const res = await ProductService.deleteProduct(parameters.productId);
    return res.id;
    
  },
};

export const resolvers = { queries, mutations };
