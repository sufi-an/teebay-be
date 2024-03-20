import ProductService, { CreateProductPayload, UpdateProdductPayload } from "../../services/product";



const queries = {
  getProductByUser: async (_: any, parameters: any, context: any) => {
    const products = await ProductService.getProductByUser(parameters.userId);
    console.log(products)
      return products;
   
  },
  getProductById:async (_: any, parameters: any, context: any) =>{
    const product = await ProductService.getProductById(parameters.id)
    return product
  }

};

const mutations = {
  createProduct: async (_: any, payload: any) => {

    const res = await ProductService.createProduct(payload);
    return res.id;

  },
  updateProduct:async (_: any, payload: UpdateProdductPayload) => {

    const res = await ProductService.updateProduct(payload);
    return res.id

  },
  deleteProduct:async (_: any, parameters: any) => {
    console.log(parameters)
    const res =  ProductService.deleteProduct(parameters.id);
    return res;
    
  },
};

export const resolvers = { queries, mutations };
