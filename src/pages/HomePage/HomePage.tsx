import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {db} from '../../config/firebase';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchInput from '../../components/searchInput';
import Block from '../../assets/images/Illustration.svg';
import HomeIcon from '../../assets/icons/home.svg';
import AddTodoIcon from '../../assets/icons/Menu.svg';
import InActive from '../../assets/icons/Inctive.svg';
import LeftIcon from '../../assets/icons/leftIcon.svg';
import EditDeleteModal from '../../components/editDeleteModal';

export default function HomePage() {
  const navigation = useNavigation();
  const [data, setData] = useState<Array>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleEditPress = () => {
    // Handle edit action
    // ...
    setIsModalVisible(false);
  };

  const handleDeletePress = () => {
    // Handle delete action
    // ...
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const fetchTodo = useCallback(async () => {
    try {
      const todos = await db.collection('todos').get();
      const todoResult = [];

      todos.forEach(todo => {
        const todoData = todo.data();
        const date = todoData.date.toDate();
        todoResult.push({
          id: todo.id,
          ...todoData,
          date: date,
        });
      });

      setData(todoResult);
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  }, []);

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  useFocusEffect(
    useCallback(() => {
      fetchTodo();
    }, [fetchTodo]),
  );

  const navigateHome = () => {
    navigation.navigate('Add New Task');
  };

  const getStatusBackgroundColor = (status: string): string => {
    return status === 'Urgent' ? '#BA1735' : '#427DFE';
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <SafeAreaView>
        <SearchInput />
        {data.length === 0 ? (
          <Block style={{marginTop: 204, marginBottom: 200, marginLeft: 65}} />
        ) : (
          <ScrollView style={styles.scrollView}>
            {data.map((todo, key) => {
              return (
                <View key={key}>
                  <View style={[styles.todoContainer]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.todoTitle}>{todo.title}</Text>
                      <TouchableOpacity onPress={handleShowModal}>
                        {isModalVisible && (
                          <EditDeleteModal
                            visible={isModalVisible}
                            onEditPress={handleEditPress}
                            onDeletePress={handleDeletePress}
                            onClose={handleCloseModal}
                          />
                        )}
                        <LeftIcon />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.todoNote}>
                      {todo.date ? todo.date.toDateString() : 'No Date'}
                    </Text>
                    <Text style={styles.notes}>{todo.notes}</Text>
                    <Text
                      style={{
                        backgroundColor: getStatusBackgroundColor(todo.status),
                        color: '#FFFFFF',
                        width: 49,
                        fontSize: 10,
                        padding: 4,
                        borderRadius: 4,
                        marginLeft: 4,
                      }}>
                      {todo.status}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </SafeAreaView>

      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity style={{backgroundColor: 'white'}}>
          <View style={styles.homeIcon}>
            <HomeIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: 'white'}}
          onPress={navigateHome}>
          <View>
            <AddTodoIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: 'white'}}>
          <View style={styles.homeIcon}>
            <InActive />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeIcon: {
    marginTop: 50,
    backgroundColor: 'white',
  },
  Text: {
    color: 'black',
    textAlign: 'center',
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B0A11',
    padding: 2,
    marginLeft: 2,
  },
  todoNote: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 4,
  },
  todoContainer: {
    width: 335,
    marginLeft: 15,
    height: 136,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  scrollView: {
    height: 574,
    marginTop: 20,
  },
  notes: {
    color: '#0B0A11',
    fontSize: 12,
    fontWeight: '400',
    padding: 4,
  },
});
