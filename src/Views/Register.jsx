import React, { useState } from 'react';
import { withTheme, Button, TextInput, HelperText, Title } from 'react-native-paper';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import { useMutation } from 'react-apollo';

import { REGISTER } from '../Apollo/mutation/AuthMutation';
import UsernameInput from '../Components/Inputs/UsernameInput';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column'
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

function Register(props) {
  const { colors } = props.theme;
  const { navigation } = props;

  const [username, setUsername] = useState({ value: '', error: false });
  const [password, setPassword] = useState({ value: '', error: false });
  const [validPassword, setValidPassword] = useState({ value: '', error: false });
  const [errForm, setErrForm] = useState(false);
  const [createUser] = useMutation(REGISTER, {
    onCompleted: () => {
      navigation.navigate('LoginScreen');
    },
    onError: error => {
      console.log(error);
      setErrForm(true);
    }
  });

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
    if (username.value === '' || password.value === '') setErrForm(true);
    else if (username.error || password.error) setErrForm(true);
    else {
      createUser({ variables: { password: password.value, username: username.value } });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding" keyboardVerticalOffset={30}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <Title style={styles.title}>Inscrivez vous</Title>
        {errForm && (
          <Title style={styles.error}>
            Erreur lors de la création du compte , veuillez vérifier les champs remplis.
          </Title>
        )}
        <UsernameInput username={username} setUsername={setUsername} />
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
        <Button onPress={onSubmit}>Inscrivez vous</Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default withTheme(Register);

Register.propTypes = {};
