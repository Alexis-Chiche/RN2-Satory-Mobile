import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme, Button, TextInput, HelperText, Title } from 'react-native-paper';
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
  title: {
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});

function Register(props) {
  const { colors } = props.theme;
  const { navigation } = props;

  const [username, setUsername] = useState({ value: '', error: false });
  const [password, setPassword] = useState({ value: '', error: false });
  const [validPassword, setValidPassword] = useState({ value: '', error: false });

  function validateUsername() {
    const pattern = /[a-zA-Z][a-zA-Z0-9-_]{3,32}/g;
    if (username.value === '') setUsername({ ...username, error: false });
    else setUsername({ ...username, error: !pattern.test(username.value) });
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

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding" keyboardVerticalOffset={30}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <Title style={styles.title}>Inscrivez vous</Title>
        <TextInput
          underlineColor="gold"
          label="Nom d'utilisateur"
          error={username.error}
          value={username.value}
          onChangeText={newValue => setUsername({ ...username, value: newValue })}
          onBlur={validateUsername}
        />
        <HelperText type="error" visible={username.error}>
          Le nom d&apos;utilisateur doit avoir au minimum quatre caractères et doit commencer par
          une lettre
        </HelperText>
        <TextInput
          secureTextEntry
          underlineColor="gold"
          label="Mot de Passe"
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
          label="Confirmez votre mot de passe"
          error={validPassword.error}
          value={validPassword.value}
          onChangeText={newValue => setValidPassword({ ...validPassword, value: newValue })}
          onBlur={validateValidPassword}
        />
        <HelperText type="error" visible={validPassword.error}>
          Les deux mots de passes ne sont pas identique
        </HelperText>
        <Button onPress={() => navigation.navigate('HomeScreen')}>Inscrivez vous</Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default withTheme(Register);

Register.propTypes = {};
