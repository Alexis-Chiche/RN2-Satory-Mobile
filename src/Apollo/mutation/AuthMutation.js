import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      id
      username
      role
    }
  }
`;

export const REGISTER = gql`
  mutation register($password: String!, $username: String!) {
    register(password: $password, username: $username) {
      id
      username
      role
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export const UPDATE_USER = gql`
  mutation update_user($password: String, $username: String, $picture: String) {
    updateUser(password: $password, username: $username, picture: $picture) {
      id
      username
      role
      picture
    }
  }
`;
