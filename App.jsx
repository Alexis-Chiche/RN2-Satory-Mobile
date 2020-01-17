import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Home from './src/Home';

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

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Home />
    </PaperProvider>
  );
}
