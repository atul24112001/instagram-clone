import { gql } from "@apollo/client";

export const VERIFY_USER = gql`
  query VerifyUser {
    verifyUser {
      id
      name
      email
      userName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login(
    $name: String!
    $email: String!
    $password: String!
    $userName: String!
  ) {
    login(
      name: $name
      email: $email
      password: $password
      userName: $userName
    ) {
      message
      name
      userName
      email
      id
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $userName: String!
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      userName: $userName
    ) {
      message
      name
      userName
      email
      id
      token
    }
  }
`;
