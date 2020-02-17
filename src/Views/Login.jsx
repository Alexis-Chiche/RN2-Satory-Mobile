import React, { useState } from 'react';
import { withTheme, Button, TextInput, Title } from 'react-native-paper';
import { StyleSheet, ScrollView, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { useMutation } from 'react-apollo';

import { LOGIN } from '../Apollo/mutation/AuthMutation';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column'
  },
  input: {
    marginBottom: 50
  },
  button: {
    marginVertical: 20
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});

function Login(props) {
  const { colors } = props.theme;
  const { navigation } = props;

  const [username, setUsername] = useState({ value: '', error: false });
  const [password, setPassword] = useState({ value: '', error: false });
  const [errForm, setErrForm] = useState(false);
  const [loginUser] = useMutation(LOGIN, {
    onCompleted: async () => {
      AsyncStorage.setItem('isLoggedIn', 'true').then(navigation.navigate('Auth'));
    },
    onError: async e => {
      if (e.message.includes('Already connected'))
        AsyncStorage.setItem('isLoggedIn', 'true').then(navigation.navigate('Auth'));
      setErrForm(true);
    }
  });

  function onSubmit() {
    if (username.value === '' || password.value === '') setErrForm(true);
    else if (username.error || password.error) setErrForm(true);
    else {
      setErrForm(false);
      loginUser({ variables: { password: password.value, username: username.value } });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding" keyboardVerticalOffset={30}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <Title style={styles.title}>Connexion</Title>
        {errForm && (
          <Title style={styles.error}>Une erreur est survenue, veuillez ressayer plus tard.</Title>
        )}
        <TextInput
          underlineColor="gold"
          label="Nom d'utilisateur"
          value={username.value}
          onChangeText={newValue => setUsername({ ...username, value: newValue })}
        />
        <TextInput
          style={styles.inputs}
          secureTextEntry
          underlineColor="gold"
          label="Mot de Passe"
          value={password.value}
          onChangeText={newValue => setPassword({ ...username, value: newValue })}
        />
        <Button
          style={styles.button}
          mode="contained"
          disabled={username.value === '' || password.value === ''}
          onPress={onSubmit}
        >
          Se connecter
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default withTheme(Login);

Login.propTypes = {};
