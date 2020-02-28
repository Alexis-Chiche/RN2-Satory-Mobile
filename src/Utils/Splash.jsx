import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { AppLoading } from 'expo';
import { AsyncStorage } from 'react-native';

export default function Splash({ setIsLoggedIn, children }) {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <AppLoading
        startAsync={
          async () =>
            AsyncStorage.getItem('isLoggedIn', (err, result) => {
              if (result !== null && result === 'true') setIsLoggedIn(true);
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
        onFinish={() => setLoading(false)}
        onError={error => console.warn(error)}
        autoHideSplash
      />
    );
  }
  return <>{children}</>;
}

Splash.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
