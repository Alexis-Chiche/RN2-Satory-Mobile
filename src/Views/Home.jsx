import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { withTheme, Button, Title } from 'react-native-paper';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';

import Logo from '../../assets/logo_satory.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center'
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around'
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  title: {
    paddingTop: 35,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

function Home({ navigation, theme }) {
  const { colors } = theme;
  const [, setLoggedIn] = useState(false);

  AsyncStorage.getItem('isLoggedIn', (err, result) => {
    if (result !== null && result === 'true') setLoggedIn(true);
  });
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={Logo} style={styles.logo} />
      <Title style={styles.title}>Bienvenu sur l&apos;application mobile de Satory</Title>
      <View style={styles.options}>
        <Button
          icon="account-plus"
          style={styles.options_button}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          S&apos;inscrire
        </Button>
        <Button icon="login" onPress={() => navigation.navigate('LoginScreen')}>
          Se connecter
        </Button>
      </View>
    </View>
  );
}

Home.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      background: PropTypes.string.isRequired
    })
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({})
    }).isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired
};

export default withTheme(Home);
