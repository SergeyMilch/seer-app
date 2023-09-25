import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultScreen({ route }) {
  const { pageNumber, lineNumber, result } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Номер страницы: {pageNumber}</Text>
      <Text style={styles.text}>Номер строки: {lineNumber}</Text>
      <Text style={styles.text}>Результат: {result}</Text>
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
    fontSize: 18,
    marginBottom: 10,
  },
});
