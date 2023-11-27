export const typeDefs = `#graphql
    type Post {
        id: String!
        caption: String!
        userId: String
        assets: [Asset]
        user: User
   }

   type Asset {
        id: String!
        type: String!
        postId: String
        userId: String!
   }

   type CreatePostResponse {
     post: Post!
   }

   input AssetPayloadInput {
     type: String!
     url: String!
   }
`;
