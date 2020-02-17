import React from 'react';
import { useQuery } from 'react-apollo';
import { Button, Card, Text, withTheme, Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GET_MY_EVENTS } from '../Apollo/query/EventQuery';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
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
  input: {
    marginBottom: 50
  },
  button: {
    marginVertical: 15
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  image: {
    marginTop: 15,
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 200 / 2
  }
});

function MyEvents({ navigation, theme }) {
  const { colors } = theme;

  const { loading, error, data, refetch } = useQuery(GET_MY_EVENTS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Card style={[styles.card, { backgroundColor: colors.background }]}>
        <Card.Content>
          <Title style={styles.title}>Creation d'un événement</Title>
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
          <Card>
            <Title>Test</Title>
          </Card>
          <Card>
            <Title>Test</Title>
          </Card>
          <Card>
            <Title>Test</Title>
          </Card>
          <Card>
            <Title>Test</Title>
          </Card>
          <Card>
            <Title>Test</Title>
          </Card>
          <Card>
            <Title>Test</Title>
          </Card>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

export default withTheme(MyEvents);
