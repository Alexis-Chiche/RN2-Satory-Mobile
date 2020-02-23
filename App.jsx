import React, { useState } from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Client from './src/Apollo/Client';
import RootNavigator from './src/Utils/Router';
import Splash from './src/Utils/Splash';

const theme = {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#D89715',
    accent: '#303131',
    disabled: '#40434E',
    backdrop: '#E2F1AF',
    placeholder: '#F9BC2C',
    background: '#0A0908',
    text: '#D89715'
  }
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  return (
    <Splash setIsLoggedIn={setIsLoggedIn}>
      <Client>
        <PaperProvider theme={theme}>
          <RootNavigator isLoggedIn={isLoggedIn} />
        </PaperProvider>
      </Client>
    </Splash>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);
