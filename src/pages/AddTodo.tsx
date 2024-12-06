import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import Check from '../assets/icons/edit.svg';
import firestore from '@react-native-firebase/firestore';
import {db} from '../config/firebase';
import {Toast} from 'react-native-toast-notifications';
import ShowToast from '../components/showToast';

interface TodoItem {
  title: string;
  notes: string;
  status: string;
  date: Date;
}

const AddTodo: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const placeholderText = '-Select Tags-';

  const formatDate = (date: Date): string => {
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  };

  const addTodoHandler = async () => {
    try {
      const result = await db.collection('todos').add({
        title,
        notes,
        status,
        date,
      });
      setDate(new Date()); // Reset date after adding
      setTitle('');
      setNotes('');
      setStatus(''); // Reset status after adding
      ShowToast('success', 'Todo Addedd Successfully ! ');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.inputLabel}>Task Title</Text>
        <TextInput
          style={styles.inputPlaceholder}
          placeholder="Input Task Title .."
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.inputLabel}>Notes</Text>
        <TextInput
          style={styles.notes}
          placeholder="Input Task Notes .."
          value={notes}
          onChangeText={setNotes}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.inputLabel}>Tags</Text>
        <View style={styles.tag}>
          <Picker
            style={styles.tagPicker}
            selectedValue={status}
            onValueChange={(itemValue: string) => setStatus(itemValue)}>
            <Picker.Item label={placeholderText} disabled />
            <Picker.Item label="Urgent" value="Urgent" />
            <Picker.Item label="Normal" value="Normal" />
          </Picker>
        </View>
      </View>
      <Text style={styles.remindButton}>Remind Me</Text>
      <View style={styles.dateButton}>
        <TouchableOpacity style={styles.touch} onPress={() => setOpen(true)}>
          <View>
            <View>
              <Text style={{fontSize: 12, fontWeight: 400}}>Date and Time</Text>
              <Text style={{fontSize: 16, fontWeight: 700, color: '#0B0A11'}}>
                {formatDate(date)}
              </Text>
            </View>
            <DatePicker
              modal
              open={open}
              date={date}
              confirmText="Set Date and Time"
              cancelText=""
              onDateChange={setDate}
              onConfirm={(date: Date) => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => setOpen(false)}
            />
          </View>
          <Check style={{marginLeft: 55, marginTop: 20}} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={addTodoHandler} style={styles.button}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddTodo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Change the background color here
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  content: {
    marginBottom: 4,
  },
  inputLabel: {
    fontSize: 14,
    color: '#0B0A11',
    marginBottom: 5,
  },
  inputPlaceholder: {
    borderColor: '#CBCBCB',
    borderWidth: 1,
    height: 38,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  notes: {
    borderColor: '#CBCBCB',
    borderWidth: 1,
    height: 90,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#',
    borderRadius: 5,
    borderColor: '#CBCBCB',
  },
  tagPicker: {
    width: '100%',
  },
  button: {
    backgroundColor: '#7EBB4F',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 260,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  remindButton: {
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
    padding: 4,
  },
  dateButton: {},
  touch: {
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CBCBCB',
    padding: 20,
  },
});
