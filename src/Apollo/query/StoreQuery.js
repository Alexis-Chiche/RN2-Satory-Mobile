import { gql } from 'apollo-boost';

const GET_CURRENT_USER = gql`
  {
    me {
      id @client
      role @client
    }
  }
`;

export default GET_CURRENT_USER;
