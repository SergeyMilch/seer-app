import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function InputScreen({ navigation }) {
  const [pageNumber, setPageNumber] = useState('');
  const [lineNumber, setLineNumber] = useState('');

  const goToResultScreen = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/sentence/${pageNumber}/${lineNumber}`);
      const result = response.data.sentence;

      navigation.navigate('Result', {
        pageNumber: parseInt(pageNumber),
        lineNumber: parseInt(lineNumber),
        result,
      });
    } catch (error) {
      console.error('Ошибка при запросе:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPageNumber('');
      setLineNumber('');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Номер страницы:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={pageNumber}
        onChangeText={setPageNumber}
      />
      <Text style={styles.label}>Номер строки:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={lineNumber}
        onChangeText={setLineNumber}
      />
      <TouchableOpacity onPress={goToResultScreen} style={styles.button}>
        <Text style={styles.buttonText}>Узнать результат</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
    width: 150,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    maxWidth: 150,
    textAlign: 'center',
  },
});
