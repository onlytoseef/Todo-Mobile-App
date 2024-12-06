import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const EditDeleteModal = ({visible, onEditPress, onDeletePress, onClose}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onDeletePress}>
              <Text style={styles.buttonDelete}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.100)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 92.03,
  },
  textStyle: {
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  editButton: {
    borderRadius: 4,
  },
  deleteButton: {
    borderRadius: 4,
    padding: 10,
  },
  buttonText: {
    color: '#0B0A11',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonDelete: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  separator: {
    height: 1, // Adjust height for line thickness
    backgroundColor: 'black', // Adjust color as needed
    width: '100%', // Span the entire width
    marginVertical: 5, // Add vertical margins for spacing
  },
});

export default EditDeleteModal;
