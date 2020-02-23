import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { ScrollView, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import { withTheme, Button, Title, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation } from 'react-apollo';

import { GET_MY_EVENTS } from '../Apollo/query/EventQuery';
import { CREATE_EVENT, UPDATE_EVENT } from '../Apollo/mutation/EventMutation';
import CameraPicker from '../Components/Buttons/Camera';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column'
  },
  button: {
    marginVertical: 15
  },
  picker: {
    marginVertical: 15,
    alignSelf: 'flex-start'
  },
  error: {
    color: '#D72638',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  image: {
    marginTop: 15,
    alignSelf: 'center',
    width: 300,
    height: 200
  }
});

function EditEvent({ navigation, theme }) {
  const { colors } = theme;
  const {
    state: { params: event }
  } = navigation;

  const [image, setImage] = useState(null);
  const [eventTitle, setEventTitle] = useState(event?.event.title);
  const [eventDescr, setEventDescr] = useState(event?.event.title);
  const [eventDate, setEventDate] = useState({
    value: event?.event.date ? new Date(event?.event.date) : new Date(),
    show: false
  });
  const [errEvent, setErrEvent] = useState(false);

  const [createEvent] = useMutation(CREATE_EVENT, {
    update: (cache, { data }) => {
      const { me } = cache.readQuery({ query: GET_MY_EVENTS });
      cache.writeQuery({
        query: GET_MY_EVENTS,
        data: {
          me: {
            ...me,
            myevents: [...me.myevents, data.createEvent]
          }
        }
      });
    },
    onCompleted: () => {
      navigation.goBack();
    },
    onError: () => {
      setErrEvent(true);
    }
  });

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    onCompleted: () => {
      navigation.goBack();
    },
    onError: () => {
      setErrEvent(true);
    }
  });

  function onSubmit() {
    if (new Date() >= eventDate.value || eventTitle === '') {
      setErrEvent(true);
      return;
    }
    if (event?.event) {
      updateEvent({
        variables: {
          id: event.event.id,
          title: eventTitle,
          content: eventDescr,
          date: eventDate.value
        }
      });
    } else {
      createEvent({
        variables: { title: eventTitle, content: eventDescr, date: eventDate.value }
      });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding" keyboardVerticalOffset={30}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <Title style={styles.title}>Nouvel événement</Title>
        {errEvent && <Title style={styles.error}>Verifiez les champs renseignés</Title>}
        {image && <Image source={{ uri: image.uri }} style={styles.image} />}
        <CameraPicker setImage={setImage} />
        <TextInput
          label="Nom de l'événement"
          value={eventTitle}
          onChangeText={newValue => setEventTitle(newValue)}
          underlineColor="gold"
        />
        <Button
          style={styles.picker}
          icon="clock"
          onPress={() => {
            setErrEvent(false);
            setEventDate({ ...eventDate, show: true });
          }}
        >
          {`Date prévue : ${eventDate.value.toLocaleDateString('en-US')}`}
        </Button>
        {eventDate.show && (
          <DateTimePicker
            value={eventDate.value}
            mode="date"
            onChange={(_, date) => (date ? setEventDate({ value: date, show: false }) : null)}
          />
        )}
        <TextInput
          label="Details de l'événement"
          value={eventDescr}
          onChangeText={newValue => setEventDescr(newValue)}
          underlineColor="gold"
        />
        <Button style={styles.button} icon="content-save-edit" onPress={onSubmit}>
          {event?.event ? 'Modifier ses informations' : "Créez l'événement"}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

EditEvent.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      background: PropTypes.string.isRequired
    })
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({})
    }).isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired
};

export default withTheme(EditEvent);
