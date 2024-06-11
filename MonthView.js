import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function MonthView({ onMonthPress }) {
  return (
    <View style={styles.container}>
      {months.map((month, index) => (
        <TouchableOpacity key={index} onPress={() => onMonthPress(month)}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>{month}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    margin: 8,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MonthView;
