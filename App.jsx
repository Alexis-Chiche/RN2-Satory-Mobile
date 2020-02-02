import React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Client from './src/Apollo/Client';
import RootNavigator from './src/RootStack';

const theme = {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#D89715',
    accent: '#C9CAD9',
    disabled: '#40434E',
    backdrop: '#E2F1AF',
    placeholder: '#F9BC2C',
    background: '#0A0908',
    text: '#F9BC2C'
  }
};

const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000/'
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <RootNavigator />
      </PaperProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);
