import { gql } from 'apollo-boost';

export const GET_MY_EVENTS = gql`
  query me {
    me {
      id
      myevents {
        id
        title
        content
        date
        updatedAt
        comments {
          id
          content
          createdAt
          author {
            username
          }
        }
        author {
          id
          username
        }
        participants {
          id
          username
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ALL_EVENTS = gql`
  query GET_ALL_EVENTS {
    events {
      id
      title
      content
      date
      updatedAt
      comments {
        id
        content
        createdAt
        author {
          username
        }
      }
      author {
        id
        username
      }
      participants {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`;
