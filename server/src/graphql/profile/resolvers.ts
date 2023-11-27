import ProfileServices from "../../services/profile";
const mutations = {};

const queries = {
  Initial: async (p1: any, p2: any, Context: any) => {
    return ProfileServices.getProfileDetails(Context);
  },
};

export const resolvers = { mutations, queries };
