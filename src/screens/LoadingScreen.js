import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#C5A653" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F7',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
});

export default LoadingScreen;
