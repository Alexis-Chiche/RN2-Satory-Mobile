import React from 'react';
import { PropTypes } from 'prop-types';
import { useQuery } from 'react-apollo';
import { Button, Card, Text, withTheme, Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { GET_MY_EVENTS } from '../Apollo/query/EventQuery';
import EventPreview from '../Components/Events/EventPreview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column'
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1.5,
    borderBottomColor: '#F9BC2C'
  },
  button: {
    marginVertical: 15
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});

function MyEvents({ navigation, theme }) {
  const { colors } = theme;

  const { loading, error, data } = useQuery(GET_MY_EVENTS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Card style={[styles.card, { backgroundColor: colors.background }]}>
        <Card.Content>
          <Title style={styles.title}>Creation d&apos;un événement</Title>
          <Button
            style={styles.button}
            icon="calendar-plus"
            onPress={() => navigation.navigate('EditEvent')}
          >
            Creer un nouvel événement
          </Button>
        </Card.Content>
      </Card>
      <Card style={[styles.card, { backgroundColor: colors.background }]}>
        <Card.Content>
          <Title style={styles.title}>Mes événements</Title>
          {data.me.myevents.map(event => {
            return (
              <EventPreview
                key={event.id}
                navigation={navigation}
                myId={data.me.id}
                event={event}
              />
            );
          })}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

MyEvents.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      background: PropTypes.string.isRequired
    })
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default withTheme(MyEvents);
