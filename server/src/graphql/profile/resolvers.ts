import ProfileServices from "../../services/profile";
const mutations = {};

const queries = {
  getInitialData: async (p1: any, p2: any, Context: any) => {
    return ProfileServices.getProfileDetails(Context);
  },
  getProfile: async (p1: any, p2: any, Context: any) => {
    return ProfileServices.getProfile(Context, p2.userName);
  },
};

export const resolvers = { mutations, queries };
