import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
//import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Home from './src/Home';
import Client from './src/Apollo/Client';

const theme = {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f7ce03',
    accent: '#f1c40f',
    background: '#000000',
    text: '#f7ce03'
  }
};

const client = new ApolloClient({
  uri: 'https://api.greefine.fr/'
});

export default function App() {
  return (
    <Client>
      <PaperProvider theme={theme}>
        <Home />
      </PaperProvider>
    </Client>
  );
}
