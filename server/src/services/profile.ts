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

  public static async getProfile(context: Context, userName: string) {
    const { currentUser } = context;
    if (!currentUser) {
      return new GraphQLError("Access Denied");
    }
    console.log(userName);

    const targetUser = await prisma.user.findFirst({
      where: {
        userName,
      },
    });
    if (!targetUser) {
      return new GraphQLError("User Not Found");
    }
    const [posts, postsCount, followersCount, followingCount] =
      await prisma.$transaction([
        prisma.post.findMany({
          where: {
            userId: targetUser.id,
          },
          include: {
            assets: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 25,
          skip: 0,
        }),
        prisma.post.count({
          where: {
            userId: targetUser.id,
          },
        }),
        prisma.user_follow.count({
          where: {
            userId: targetUser.id,
          },
        }),
        prisma.user_follow.count({
          where: {
            follow: targetUser.id,
          },
        }),
      ]);

    return {
      user: {
        name: targetUser.name,
        id: targetUser.id,
        email: targetUser.email,
        userName: targetUser.userName,
      },

      followersCount,
      followingCount,
      postsCount,
      posts: posts,
    };
  }
}

export default ProfileServices;
