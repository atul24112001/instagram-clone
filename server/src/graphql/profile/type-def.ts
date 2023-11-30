export const typeDefs = `#graphql
    type InitialData {
        suggestedUsers: [User]
        posts: [Post]
    }

    type ProfileData {
        user: User
        posts: [Post]
        followersCount:Int!
      followingCount: Int!
      postsCount: Int!
    }
`;
