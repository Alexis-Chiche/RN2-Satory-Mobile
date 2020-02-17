import React from 'react';
import { HelperText, TextInput } from 'react-native-paper';

export default function UsernameInput({ username, setUsername }) {
  function validateUsername() {
    const pattern = /[a-zA-Z][a-zA-Z0-9-_]{3,32}/g;
    if (username.value === '') setUsername({ ...username, error: false });
    else setUsername({ ...username, error: !pattern.test(username.value) });
  }

  return (
    <>
      <TextInput
        underlineColor="gold"
        label="Nom d'utilisateur"
        error={username.error}
        value={username.value}
        onChangeText={newValue => setUsername({ ...username, value: newValue })}
        onBlur={validateUsername}
      />
      <HelperText type="error" visible={username.error}>
        Le nom d&apos;utilisateur doit avoir au minimum quatre caractères et doit commencer par une
        lettre
      </HelperText>
    </>
  );
}
