import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home';
import Register from './Register';
import LogoTitle from '../assets/Logo';
import Login from './Login';

const RootStack = createStackNavigator(
  {
    HomeScreen: Home,
    RegisterScreen: Register,
    LoginScreen: Login
  },
  {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: {
      headerTitle: () => <LogoTitle />,
      headerTintColor: '#F9BC2C',
      headerStyle: {
        height: 55,
        backgroundColor: '#0A0908'
      }
    }
  }
);

const AppContainer = createAppContainer(RootStack);

function RootNavigator(props) {
  return <AppContainer props={props} />;
}

export default RootNavigator;
