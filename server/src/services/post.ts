import { GraphQLError } from "graphql";
import { prisma, s3 } from "../utils/functions";
import { ManagedUpload } from "aws-sdk/clients/s3";
import { Asset, Context } from "../../types";

export type AssetPayload = {
  url: string;
  type: string;
};

class PostService {
  public static async getPosts(context: Context, skip: number = 0) {
    const { currentUser } = context;
    if (!currentUser) {
      return new GraphQLError("Access Denied");
    }

    const followedUsers = await prisma.user_follow.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    const posts = await prisma.post.findMany({
      where: {
        userId: {
          in: [currentUser.id, ...followedUsers.map((usr: any) => usr.id)],
        },
      },
      include: {
        assets: true,
      },
      take: 25,
      skip: skip,
    });
    return {
      posts,
    };
  }

  public static async createPost(
    context: Context,
    caption: string,
    assets: AssetPayload[]
  ) {
    const { currentUser } = context;
    if (!currentUser) {
      return new GraphQLError("Access Denied");
    }

    const post = await prisma.post.create({
      data: {
        caption,
        userId: currentUser.id,
      },
    });

    let uploadedAssets: Asset[] = [];
    for (let asset of assets) {
      const newAsset = await prisma.asset.create({
        data: {
          type: "image",
          userId: currentUser.id,
          postId: post.id,
        },
      });
      const params = {
        Key: `post/${newAsset.id}`,
        Bucket: process.env.S3_BUCKET_NAME as string,
        ContentType: asset.type,
        Body: asset.url,
      };
      s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
        if (err) {
          throw Error(err.message);
        } else {
          console.log("Image uploaded successfully. S3 URL:", data.Location);
        }
      });
      uploadedAssets.push(newAsset);
    }

    return {
      post: {
        ...post,
        assets: uploadedAssets,
      },
    };
  }
}

export default PostService;
