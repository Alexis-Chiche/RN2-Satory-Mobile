import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Logo from './logo_satory.png';

const styles = StyleSheet.create({
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'center'
  }
});

function LogoTitle() {
  return <Image source={Logo} style={styles.logo} />;
}

export default LogoTitle;
