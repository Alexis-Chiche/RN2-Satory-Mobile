import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Card, withTheme, Title, Paragraph } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AuthorButton from '../Buttons/AuthorButton';

const styles = StyleSheet.create({
  cardEvent: {
    flex: 1,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#F9BC2C'
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  error: {
    color: '#D72638',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14
  }
});

function EventPreview({ theme, navigation, myId, event }) {
  const { colors } = theme;
  const eventDate = new Date(event.date);
  const date = eventDate.toDateString('default', { month: 'short' });
  const [errEvent, setErrEvent] = useState(false);

  return (
    <Card style={[styles.cardEvent, { backgroundColor: colors.accent }]} key={event.id}>
      {event.picture && <Card.Cover source={{ uri: `data:image/png;base64,${event.picture}` }} />}
      <Card.Content>
        {errEvent && (
          <Paragraph style={styles.error}>Impossible de supprimer, essayez plus tard</Paragraph>
        )}
        <Title style={styles.title}>{event.title}</Title>
        <Paragraph>{`${date}  - ${event.participants.length} participant(s)`}</Paragraph>
        <Paragraph>{event.content}</Paragraph>
      </Card.Content>
      <Card.Actions>
        {event.author.id === myId ? (
          <AuthorButton event={event} navigation={navigation} setErrEvent={setErrEvent} />
        ) : null}
      </Card.Actions>
    </Card>
  );
}

EventPreview.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      accent: PropTypes.string.isRequired
    })
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  myId: PropTypes.string.isRequired,
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    picture: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.string
    }),
    participants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string
      })
    )
  }).isRequired
};

export default withTheme(EventPreview);
