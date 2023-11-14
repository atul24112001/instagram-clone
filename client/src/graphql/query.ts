import { gql } from "@apollo/client";

export const VERIFY_USER = gql`
  query VerifyUser {
    verifyUser {
      id
      name
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($name: String!, $email: String!, $password: String!) {
    login(name: $name, email: $email, password: $password) {
      message
      name
      email
      id
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation CreateUser(
    $createUserName: String!
    $createUserEmail: String!
    $createUserPassword: String!
  ) {
    createUser(
      name: $createUserName
      email: $createUserEmail
      password: $createUserPassword
    ) {
      message
      name
      email
      id
      token
    }
  }
`;
