import React, { useState, useEffect } from 'react';
import {
  AsyncStorage,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import { withTheme, Button, Title, TextInput, HelperText } from 'react-native-paper';
import { useApolloClient, useMutation, useQuery } from 'react-apollo';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import UsernameInput from '../Components/Inputs/UsernameInput';
import { LOGOUT, UPDATE_USER } from '../Apollo/mutation/AuthMutation';
import { ME } from '../Apollo/query/AuthQuery';

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
  },
  error: {
    color: '#D72638',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14
  }
});

function Settings({ navigation, theme }) {
  const client = useApolloClient();
  const [image, setImage] = useState(null);
  const [permission, setPermission] = useState('');
  const { loading, error, data } = useQuery(ME);

  const [errForm, setErrForm] = useState(false);
  const [username, setUsername] = useState({ value: data.me.username, error: false });
  const [password, setPassword] = useState({ value: '', error: false });
  const [validPassword, setValidPassword] = useState({ value: '', error: false });

  const { colors } = theme;

  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      client.resetStore();
      AsyncStorage.removeItem('isLoggedIn').then(navigation.navigate('Unauth'));
    },
    onError: () => {
      return <Text>Error!</Text>;
    }
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      navigation.goBack();
    },
    onError: () => {
      setErrForm(true);
    }
  });

  useEffect(() => {
    if (Constants.platform.ios) {
      const { status } = Permissions.askAsync(Permissions.CAMERA_ROLL);
      setPermission(true);
      if (status !== 'granted') {
        setPermission(false);
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  });

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

  function validateValidPassword() {
    if (validPassword.value === '' && password.value === '')
      setValidPassword({ ...validPassword, error: false });
    else setValidPassword({ ...validPassword, error: validPassword.value !== password.value });
  }

  function validatePassword() {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password.value === '') setPassword({ ...password, error: false });
    else setPassword({ ...password, error: !pattern.test(password.value) });
    validateValidPassword();
  }

  function onSubmit() {
    if (username.value === '' || password.value === '') {
      setErrForm(true);
      return;
    }
    if (username.error || password.error) {
      setErrForm(true);
      return;
    }
    updateUser({
      variables: { password: password.value, username: username.value, role: 'ADMIN' }
    });
  }

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding" keyboardVerticalOffset={30}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <Title style={styles.title}>Votre compte</Title>
        {errForm && (
          <Title style={styles.error}>
            Une erreur est survenu, veuillez verifier les champs reseignés et reessayer plus tard.
          </Title>
        )}
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button
          style={styles.button}
          icon="camera-account"
          disabled={permission}
          onPress={() => pickImage()}
        >
          Modifier votre image de profil
        </Button>
        <UsernameInput username={username} setUsername={setUsername} />
        <TextInput underlineColor="gold" label="Role" disabled value={data.me.role} />
        <TextInput
          secureTextEntry
          underlineColor="gold"
          label="Modifiez votre mot de passe"
          error={password.error}
          value={password.value}
          onChangeText={newValue => setPassword({ ...username, value: newValue })}
          onBlur={validatePassword}
        />
        <HelperText type="error" visible={password.error}>
          Le mot de passe doit avoir au minimum huit caractères avec au moins, une lettre majuscule,
          une lettre minuscule et un chiffre
        </HelperText>
        <TextInput
          secureTextEntry
          underlineColor="gold"
          label="Confirmez votre nouveau mot de passe"
          error={validPassword.error}
          value={validPassword.value}
          onChangeText={newValue => setValidPassword({ ...validPassword, value: newValue })}
          onBlur={validateValidPassword}
        />
        <HelperText type="error" visible={validPassword.error}>
          Les deux mots de passes ne sont pas identique
        </HelperText>
        <Button style={styles.button} icon="content-save-edit" onPress={onSubmit}>
          Modifier ses informations
        </Button>
        <Button icon="login" onPress={logout}>
          Se deconnecter
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default withTheme(Settings);
