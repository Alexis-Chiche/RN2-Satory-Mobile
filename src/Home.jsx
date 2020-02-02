import React from 'react';
import { withTheme, Button, Title, Divider } from 'react-native-paper';
import { StyleSheet, View, Image } from 'react-native';
import Logo from '../assets/logo_satory.png';

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

function Home(props) {
  const { colors } = props.theme;
  const { navigation } = props;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={Logo} style={styles.logo} />
      <Title style={styles.title}>Bienvenu sur l'application mobile de Satory</Title>
      <View style={styles.options}>
        <Button
          icon="account-plus"
          style={styles.options_button}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          S'inscrire
        </Button>
        <Button icon="login" onPress={() => navigation.navigate('LoginScreen')}>
          Se connecter
        </Button>
      </View>
    </View>
  );
}

export default withTheme(Home);
