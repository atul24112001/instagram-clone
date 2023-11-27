import UserService from "../../services/user";
import { Context, CreateUserPayload } from "../../../types";

const queries = {
  verifyUser: async (p1: any, p2: {}, context: Context) => {
    return await UserService.verifyUser(context);
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    return await UserService.createUser(payload);
  },
  login: async (_: any, payload: CreateUserPayload) => {
    return await UserService.login(payload);
  },
};

export const resolvers = { queries, mutations };
