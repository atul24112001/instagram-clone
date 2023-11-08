import UserService, { CreateUserPayload } from "../../services/user";
import { hashText, prisma } from "../../utils/functions";

const queries = {
  verifyUser: async (p1: any, p2: {}, context: any) => {
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
