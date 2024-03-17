import UserService, { CreateUserPayload } from "../../services/user";
// getUserToken
const queries = {
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
  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
    throw new Error("I dont know who are you");
  },
};

const mutations = {
  registration: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.registration(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
