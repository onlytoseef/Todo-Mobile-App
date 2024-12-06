import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import HomePage from './HomePage/HomePage';
import AddTodo from './AddTodo';
import CalenderView from './CalenderView';
import {View} from 'react-native';
import Taski from '../assets/icons/taski.svg';

const Stack = createStackNavigator();

const MyScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'transparent',
    elevation: 0,
  },
};
const FrontEndNavigator = () => {
  return (
    <Stack.Navigator screenOptions={MyScreenOptions}>
      <Stack.Screen
        name="Home"
        options={{headerTitle: props => <Taski />, headerTitleAlign: 'center'}}
        component={HomePage}
      />
      <Stack.Screen
        name="Add New Task"
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
        }}
        component={AddTodo}
      />
      <Stack.Screen
        name="Calender View"
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
        }}
        component={CalenderView}
      />
    </Stack.Navigator>
  );
};

export default FrontEndNavigator;
