import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import { useQuery, useApolloClient } from 'react-apollo';
import { Card, Text, withTheme, Title } from 'react-native-paper';
import { StyleSheet, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { GET_ALL_EVENTS, GET_MY_EVENTS } from '../Apollo/query/EventQuery';
import EventPreview from '../Components/Events/EventPreview';
import DatePicker from '../Components/Buttons/DatePicker';

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

function Calendar({ theme }) {
  const [refreshEvent, setRefreshEvent] = useState(false);
  const [dateToWatch, setDateToWatch] = useState({
    value: new Date(),
    show: false
  });
  const client = useApolloClient();
  const { loading, error, data, refetch } = useQuery(GET_ALL_EVENTS);

  const { me } = client.readQuery({ query: GET_MY_EVENTS });

  const onRefresh = useCallback(() => {
    setRefreshEvent(true);
    refetch().then(setRefreshEvent(false));
  }, [refreshEvent]);

  const { colors } = theme;
  const nextWeek = new Date(dateToWatch.value.getTime() + 7 * 24 * 60 * 60 * 1000);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Erreur</Text>;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={<RefreshControl refreshing={refreshEvent} onRefresh={onRefresh} />}
    >
      <Card style={[styles.card, { backgroundColor: colors.background }]}>
        <Card.Content style={{ alignSelf: 'center' }}>
          <DatePicker eventDate={dateToWatch} setEventDate={setDateToWatch} />
        </Card.Content>
      </Card>
      <Card style={[styles.card, { backgroundColor: colors.background }]}>
        <Card.Content>
          <Title style={styles.title}>Evénements de la semaine</Title>
          {data.events.length
            ? data.events.map(event => {
                const dateEvent = new Date(event.date);
                return dateEvent >= dateToWatch.value && dateEvent <= nextWeek ? (
                  <EventPreview key={event.id} myId={me.id} event={event} />
                ) : null;
              })
            : null}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

Calendar.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      background: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withTheme(Calendar);
