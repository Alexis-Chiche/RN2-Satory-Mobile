import React from 'react';
import { PropTypes } from 'prop-types';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { IconButton } from 'react-native-paper';

import Home from '../Views/Home';
import Register from '../Views/Register';
import Login from '../Views/Login';
import LogoTitle from '../Components/Inputs/Logo';
import Settings from '../Views/Settings';
import MyEvents from '../Views/MyEvents';
import EditEvent from '../Views/EditEvent';
import Calendar from '../Views/Calendar';

const UnauthNavigator = createStackNavigator(
  {
    HomeScreen: Home,
    RegisterScreen: Register,
    LoginScreen: Login
  },
  {
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

const AuthNavigator = createMaterialTopTabNavigator(
  {
    'Mes événements': MyEvents,
    'Evénements à venir': Calendar
  },
  {
    tabBarOptions: {
      activeTintColor: '#D89715',
      labelStyle: { fontSize: 12 },
      style: { backgroundColor: '#0A0908' }
    }
  }
);

const EventNavigator = createStackNavigator(
  {
    AuthNavigator,
    Parametres: Settings,
    EditEvent
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: () => <LogoTitle />,
      headerRight: () => (
        <IconButton
          icon="settings-outline"
          color="#D89715"
          size={35}
          onPress={() => navigation.navigate('Parametres')}
        />
      ),
      headerTintColor: '#F9BC2C',
      headerStyle: {
        height: 55,
        backgroundColor: '#0A0908'
      }
    })
  }
);

// eslint-disable-next-line react/prop-types
function RootNavigator({ props, isLoggedIn }) {
  const Router = createSwitchNavigator(
    {
      Unauth: UnauthNavigator,
      Event: EventNavigator
    },
    {
      initialRouteName: isLoggedIn === true ? 'Event' : 'Unauth'
    }
  );
  const AppContainer = createAppContainer(Router);
  return <AppContainer props={props} />;
}

export default RootNavigator;
