import { gql } from 'apollo-boost';

const CREATE_COMMENT = gql`
  mutation createComment($eventId: ID!, $content: String!) {
    createComment(eventId: $eventId, content: $content) {
      id
      content
      author {
        username
      }
    }
  }
`;

export default CREATE_COMMENT;
