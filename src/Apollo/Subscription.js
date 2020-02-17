import { gql } from 'apollo-boost';

export const EVENT_SUB = gql`
  subscription event {
    event {
      mutation
      node {
        id
        title
        content
        participants {
          username
        }
      }
      updatedFields
      previousValues {
        id
        title
      }
    }
  }
`;

export const EVENT_DELETE_SUB = gql`
  subscription eventDelete {
    eventDeleted {
      id
      title
    }
  }
`;

export const COMMENT_SUB = gql`
  subscription sub_comment {
    comment {
      mutation
      node {
        id
        content
      }
      updatedFields
      previousValues {
        id
        content
      }
    }
  }
`;

export const EVENT_COMMENTS = gql`
  subscription eventComments($eventId: ID!) {
    eventComments(eventId: $eventId) {
      mutation
      node {
        id
        content
        createdAt
        author {
          username
        }
      }
    }
  }
`;
