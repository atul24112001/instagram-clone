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
        id: {
          notIn: [currentUser.id, ...followedUsers.map((usr: any) => usr.id)],
        },
      },
      take: 4,
    });

    const posts = await prisma.post.findMany({
      where: {
        userId: {
          in: [currentUser.id, ...followedUsers.map((usr: any) => usr.id)],
        },
      },
      include: {
        assets: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 25,
      skip: 0,
    });

    return {
      suggestedUsers: suggestedUsers,
      posts: posts,
    };
  }
}

export default ProfileServices;
