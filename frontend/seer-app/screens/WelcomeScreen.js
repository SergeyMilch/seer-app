import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, BackHandler } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const [exitModalVisible, setExitModalVisible] = useState(false);

  const handleExit = () => {
    setExitModalVisible(true);
  }

  const confirmExit = () => {
    BackHandler.exitApp(); // Подтверждено, выход из приложения
  }

  const cancelExit = () => {
    setExitModalVisible(false); // Отменено, закрыть модальное окно
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Input')} style={styles.button}>
        <Text style={styles.buttonText}>Начать</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
        <Text style={styles.buttonText}>Выйти</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={exitModalVisible}
        onRequestClose={() => {
          setExitModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Вы уверены, что хотите выйти?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmExit}>
                <Text style={styles.buttonText}>Да</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={cancelExit}>
                <Text style={styles.buttonText}>Отмена</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  exitButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  confirmButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
