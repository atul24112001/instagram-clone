import PostService from "../../services/post";
import { Context } from "../../../types";

const mutations = {
  createPost: async (p1: any, p2: any, context: Context) => {
    return PostService.createPost(context, p2.caption, p2.assets);
  },
};
const queries = {
  getPosts: async (p1: any, p2: any, Context: any) => {
    return PostService.getPosts(Context);
  },
};

export const resolvers = { mutations, queries };
