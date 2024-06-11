import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

function Finance() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Finance</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Finance;
