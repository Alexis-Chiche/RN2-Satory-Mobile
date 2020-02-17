import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import { withTheme, Button, Title, TextInput, DarkTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { useMutation } from 'react-apollo';

import { GET_MY_EVENTS, GET_ALL_EVENTS } from '../Apollo/query/EventQuery';
import { CREATE_EVENT } from '../Apollo/mutation/EventMutation';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column'
  },
  input: {
    marginBottom: 50
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
  const [image, setImage] = useState(null);
  const [permission, setPermission] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescr, setEventDescr] = useState('');
  const [eventDate, setEventDate] = useState({ value: new Date(), show: false });
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
      const { events } = cache.readQuery({ query: GET_ALL_EVENTS });
      cache.writeQuery({
        query: GET_ALL_EVENTS,
        data: {
          events: {
            events: [...events, data.createEvent]
          }
        }
      });
    },
    onCompleted: data => {
      console.log(data);
      navigation.goBack();
    },
    onError: error => {
      console.log(error);
      setErrEvent(true);
    }
  });

  const { colors } = theme;

  useEffect(() => {
    if (Constants.platform.ios) {
      const { status } = Permissions.askAsync(Permissions.CAMERA_ROLL);
      setPermission(true);
      if (status !== 'granted') {
        setPermission(false);
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    if (navigation.state.params?.id) console.log('Got ID');
  }, [navigation]);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  function onSubmit() {
    if (new Date() >= eventDate.value || eventTitle === '') {
      setErrEvent(true);
      return;
    }
    if (navigation.state.params?.id) {
      //TODO : EDIT LOGIC
      console.log('id');
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
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button
          style={styles.button}
          icon="camera-account"
          disabled={permission}
          onPress={() => pickImage()}
        >
          {image ? 'Modifiez la photo' : 'Ajoutez une photo'}
        </Button>
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
          {eventDate.value
            ? `Date prévue : ${eventDate.value.toLocaleDateString('en-GB')}`
            : 'Ajoutez une date'}
        </Button>
        {eventDate.show && (
          <DateTimePicker
            value={eventDate.value}
            mode="date"
            onChange={(_, date) => setEventDate({ value: date, show: false })}
          />
        )}
        <TextInput
          label="Details de l'événement"
          value={eventDescr}
          onChangeText={newValue => setEventDescr(newValue)}
          underlineColor="gold"
        />
        <Button style={styles.button} icon="content-save-edit" onPress={onSubmit}>
          {navigation.state.params?.id ? 'Modifier ses informations' : "Créez l'événement"}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default withTheme(EditEvent);
