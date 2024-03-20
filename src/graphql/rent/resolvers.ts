import RentService, { CreateRentPayload } from "../../services/Rent";

// getUserToken


const queries = {
  getAllRentByUser: async (_: any, parameters: any, context: any) => {
    
    const rent = await RentService.getAllRentByUser(parameters.lenderId);
    console.log(rent)
    return rent
  },

  getAllBorrowByUser:async (_: any, parameters: any, context: any) => {
    
    const borrow = await RentService.getAllBorrowByUser(parameters.borrowerId);
    console.log(borrow)
    return borrow
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
