import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LandingPage from './LandingPage';
import {View} from 'react-native';

const Stack = createStackNavigator();

const MyScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
};
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={MyScreenOptions}>
      <Stack.Screen
        name="Home"
        options={{headerTitle: () => <View />}}
        component={LandingPage}
      />
      <Stack.Screen
        name="Login"
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
        }}
        component={SignIn}
      />
      <Stack.Screen
        name="Register"
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
        }}
        component={SignUp}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
