import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'

const Modal = ({visible, onClose, onConfirm, message}) => (
    <Modal transparent = {true} visible={visible}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <Text style={styles.message}>{message}</Text>
                <View style={styles.buttonContainer}>
                    <Button title ='Cancel' onPress ={onClose} />
                    <Button title ='Confirm' onPress={onConfirm} />
                </View>
            </View>
        </View>
    </Modal>
)

const styles = StyleSheet.create({ 
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Modal
