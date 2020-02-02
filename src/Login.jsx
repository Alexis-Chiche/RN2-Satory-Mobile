import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme, Button, TextInput, Title } from 'react-native-paper';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';

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

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding" keyboardVerticalOffset={30}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <Title style={styles.title}>Connexion</Title>
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
          onPress={() => navigation.navigate('HomeScreen')}
        >
          Se connecter
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default withTheme(Login);

Login.propTypes = {};
