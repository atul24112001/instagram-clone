import { GraphQLError } from "graphql";
import { prisma } from "../utils/functions";
import { Context } from "../../types";

class ProfileServices {
  public static async getProfileDetails(context: Context) {
    const { currentUser } = context;
    if (!currentUser) {
      return new GraphQLError("Access Denied");
    }
    const followedUsers = await prisma.user_follow.findMany({
      where: {
        userId: currentUser.id,
      },
    });
    const suggestedUsers = await prisma.user.findMany({
      where: {
        id: { notIn: followedUsers.map((usr) => usr.id) },
      },
      take: 4,
    });

    const posts = await prisma.post.findMany({
      where: {
        userId: { in: [currentUser.id, ...followedUsers.map((usr) => usr.id)] },
      },
      take: 25,
      skip: 0,
    });

    return {
      SuggestedUser: suggestedUsers,
      Posts: posts,
    };
  }
}

export default ProfileServices;
