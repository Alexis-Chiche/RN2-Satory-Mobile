import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { withTheme, Button, Text } from 'react-native-paper';
import { StyleSheet, View, AsyncStorage } from 'react-native';

const ME = gql`
  query me {
    me {
      id
      username
      role
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function Home(props) {
  const [value, setValue] = useState('value');
  const [key, setKey] = useState('');
  const { colors } = props.theme;

  const { loading, error, data } = useQuery(ME);

  if (loading) return <Text>loading...</Text>;
  if (error) {
    console.log(error);
    return <Text>Error</Text>;
  }
  //console.log('ici', data);

  const storeKey = async () => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch {
      console.warn('error store');
    }
  };

  const retreiveKey = async () => {
    try {
      setKey(await AsyncStorage.getItem('token'));
    } catch {
      console.warn('error fetch');
    }
  };

  useEffect(() => {
    retreiveKey();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Button mode="contained" onPress={() => setValue(`Test${Math.random()}`)}>
        create new key
      </Button>
      <Button onPress={() => storeKey()}>Send Key</Button>
      <Button onPress={() => retreiveKey()}>Get Key</Button>
      <Button onPress={() => AsyncStorage.removeItem('token')}>Delete key</Button>
      <Text>New key : {value}</Text>
      <Text>Key in Store : {key}</Text>
    </View>
  );
}

export default withTheme(Home);
