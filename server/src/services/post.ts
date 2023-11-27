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
    assetsString: string
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

    const assets = JSON.parse(assetsString);

    let uploadedAssets: Asset[] = [];
    if (
      Array.isArray(assets) &&
      assets.length > 0 &&
      typeof assets[0] == "object"
    ) {
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
          Body: Buffer.from(
            asset.url.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          ),
        };
        s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
          if (err) {
            console.log(err);
            new GraphQLError(err.message);
          }
        });
        uploadedAssets.push(newAsset);
      }
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
