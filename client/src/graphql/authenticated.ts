import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($caption: String!, $assets: String!) {
    createPost(caption: $caption, assets: $assets) {
      post {
        assets {
          type
          postId
          id
        }
        caption
        id
        user {
          id
          name
          userName
          email
        }
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
        userName
        email
      }
      posts {
        id
        caption
        user {
          id
          name
          userName
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

export const GET_PROFILE = gql`
  query GetProfile($userName: String!) {
    getProfile(userName: $userName) {
      user {
        name
        email
        id
        userName
      }
      posts {
        id
        caption
        user {
          id
          name
          userName
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
