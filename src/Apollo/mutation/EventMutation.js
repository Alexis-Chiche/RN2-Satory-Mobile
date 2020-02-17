import { gql } from 'apollo-boost';

export const CREATE_EVENT = gql`
  mutation createEvent($title: String!, $content: String!, $date: DateTime!) {
    createEvent(title: $title, content: $content, date: $date) {
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

export const UPDATE_EVENT = gql`
  mutation updateEvent($id: ID!, $title: String!, $content: String!, $date: DateTime!) {
    updateEvent(id: $id, title: $title, content: $content, date: $date) {
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

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

export const PARTICIPATE = gql`
  mutation Participate($userId: ID!, $eventId: ID!) {
    addParticipant(userId: $userId, eventId: $eventId) {
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

export const ABSTAIN = gql`
  mutation Abstain($userId: ID!, $eventId: ID!) {
    removeParticipant(userId: $userId, eventId: $eventId) {
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
