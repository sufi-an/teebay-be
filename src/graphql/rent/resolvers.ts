import RentService, { CreateRentPayload } from "../../services/Rent";

// getUserToken


const queries = {
  getAllRentByUser: async (_: any, parameters: any, context: any) => {
    
    const rent = await RentService.getAllRentByUser();
    console.log(rent)
    return rent
  },

};

const mutations = {
  createRent: async (_: any, payload: CreateRentPayload) => {
    console.log(payload)
    const res = await RentService.createRent(payload);
    return res.id;

  },
 
};

export const resolvers = { queries, mutations };
