import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {loginUser} from '../../redux/slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../types/types';

export default function SignIn(props: any) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      dispatch(loginUser(email, password));
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Please Try Again Later!');
    }
  };

  const navigation = useNavigation();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  return (
    <>
      <View style={stlyes.container}>
        <Text style={stlyes.heading1}>Welcome Back</Text>
        <Text>It's Nice to see you again, Let's get going</Text>
        <View style={stlyes.inputContainer}>
          <Text style={stlyes.inputLable}>Email Address</Text>
          <TextInput
            style={stlyes.inputField}
            placeholder="your name@gmail.com"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={stlyes.inputLable}>Password</Text>
          <TextInput
            style={stlyes.inputField}
            placeholder="Input password here"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity onPress={handleLogin} style={stlyes.loginButton}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={'white'}
              style={{marginTop: 6}}
            />
          ) : (
            <Text style={stlyes.loginText}>Login</Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 9,
          }}>
          <Text>Alredy have an Account ?</Text>
          <Text
            onPress={() => {
              props.navigation.navigate('Register');
            }}
            style={{color: '#7EBB4F'}}>
            Register Here
          </Text>
        </View>
      </View>
    </>
  );
}
const stlyes = StyleSheet.create({
  container: {
    width: 335,
    margin: 'auto',
    flex: 1,
    marginLeft: 12,
  },
  heading1: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    color: '#0B0A11',
  },
  inputLable: {
    fontSize: 12,
    fontWeight: '400',
    color: '#0B0A11',
    marginTop: 7,
    marginBottom: 7,
  },
  inputContainer: {
    marginTop: 41,
  },
  inputField: {
    borderColor: '#CBCBCB',
    borderWidth: 1,
    height: 38,
    borderRadius: 5,
  },
  loginButton: {
    marginTop: 380,
    backgroundColor: '#7EBB4F',
    height: 48,
    borderRadius: 5,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 150,
    marginTop: 10,
  },
});
