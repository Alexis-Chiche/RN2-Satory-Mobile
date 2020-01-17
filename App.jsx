import React from 'react';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </PaperProvider>
  );
}
