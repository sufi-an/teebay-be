import PurchaseService, { CreatePurchasePayload } from "../../services/purchase";
// getUserToken
const queries = {
  getAllPurchaseByUser: async (_: any, parameters: any, context: any) => {
    
    const purchase = await PurchaseService.getAllPurchase(parameters.buyerId);
    console.log(purchase)
    return purchase
  },
  
  getAllSalesByUser:async (_: any, parameters: any, context: any) => {
    
    const purchase = await PurchaseService.getAllSale(parameters.sellerId);
    console.log(purchase)
    return purchase
  },

};

const mutations = {
  createPurchase: async (_: any, payload: CreatePurchasePayload) => {
    console.log(payload)
    const res = await PurchaseService.createPurchase(payload);
    return res.id;

  },
 
};

export const resolvers = { queries, mutations };
