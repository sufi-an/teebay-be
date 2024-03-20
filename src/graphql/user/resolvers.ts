import UserService, { CreateUserPayload } from "../../services/user";
// getUserToken
const queries = {
  

  getAllUsers: async(
    _: any
  )=>{
    const user = await UserService.getAllUsers();
    return user;
  },

  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
    throw new Error("I dont know who are you");
  },

  getUsersDetails: async(
    _: any,
    parameters: any,
  )=>{
   
    const user = await UserService.getUserById(parameters.id);
    console.log(user)
    return user;
  },
};

const mutations = {
  registration: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.registration(payload);
    return res.id;
  },
  login: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = await UserService.login({
      email: payload.email,
      password: payload.password,
    });
    return token;
  },
};

export const resolvers = { queries, mutations };
