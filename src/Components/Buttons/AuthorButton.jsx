import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, withTheme } from 'react-native-paper';
import { useMutation } from 'react-apollo';
import { DELETE_EVENT } from '../../Apollo/mutation/EventMutation';
import { GET_MY_EVENTS } from '../../Apollo/query/EventQuery';

function AuthorButton({ navigation, event, setErrEvent }) {
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    update(cache, { data }) {
      const { me } = cache.readQuery({ query: GET_MY_EVENTS });
      cache.writeQuery({
        query: GET_MY_EVENTS,
        data: {
          me: { ...me, myevents: me.myevents.filter(dEvent => dEvent.id !== data.deleteEvent.id) }
        }
      });
    },
    onError: () => {
      setErrEvent(true);
    }
  });

  return (
    <>
      <Button icon="calendar-edit" onPress={() => navigation.navigate('EditEvent', { event })}>
        Modifier
      </Button>
      <Button icon="delete" onPress={() => deleteEvent({ variables: { id: event.id } })}>
        Supprimer
      </Button>
    </>
  );
}

AuthorButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.string
    }),
    participants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string
      })
    )
  }).isRequired,
  setErrEvent: PropTypes.func.isRequired
};

export default withTheme(AuthorButton);
