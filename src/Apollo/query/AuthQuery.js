import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
export const ME = gql`
  query me {
    me {
      id
      username
      role
    }
  }
`;
