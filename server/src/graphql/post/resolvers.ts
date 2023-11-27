import PostService from "../../services/post";
import { Context } from "../../../types";

const mutations = {
  createPost: async (p1: any, p2: any, context: Context) => {
    return PostService.createPost(context, p2.caption, p2.assets);
  },
};
const queries = {};

export const resolvers = { mutations, queries };
