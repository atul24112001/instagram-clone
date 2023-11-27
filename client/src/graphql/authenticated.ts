import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($caption: String!, $assets: String!) {
    createPost(caption: $caption, assets: $assets) {
      post {
        assets {
          type
          userId
          postId
          id
        }
        caption
        id
        userId
      }
    }
  }
`;

export const INITIAL_DATA = gql`
  query GetInitialData {
    getInitialData {
      suggestedUsers {
        id
        name
        email
      }
      posts {
        id
        caption
        user {
          id
          name
          email
        }
        assets {
          type
          postId
          id
        }
      }
    }
  }
`;
