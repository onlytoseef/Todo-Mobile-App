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
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../redux/slices/authSlice';
import {RootState} from '../../types/types';

export default function SignUp() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async () => {
    const userData = {fullName, email, phoneNumber, password};
    try {
      dispatch(registerUser(userData));
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Please Try Later !');
    }
  };

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  return (
    <>
      <View style={stlyes.container}>
        <Text style={stlyes.heading1}>Join us today.</Text>
        <Text>It's Nice to see you , Let's start.</Text>
        <View style={stlyes.inputContainer}>
          <Text style={stlyes.inputLable}>Full Name</Text>
          <TextInput
            style={stlyes.inputField}
            placeholder="Input your full name here"
            value={fullName}
            onChangeText={setFullName}
          />
          <Text style={stlyes.inputLable}>Email Address</Text>
          <TextInput
            style={stlyes.inputField}
            placeholder="your name@gmail.com"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={stlyes.inputLable}>Phone Number</Text>
          <TextInput
            style={stlyes.inputField}
            placeholder="Input your phone number here.."
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <Text style={stlyes.inputLable}>Password</Text>
          <TextInput
            style={stlyes.inputField}
            placeholder="Input password here"
            value={password}
            onChangeText={setPassword}
          />
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
            <CheckBox
              onCheckColor="#7EBB4F"
              accessibilityLabel="I agree with terms and condition"
            />
            <Text style={{marginLeft: 1}}>
              I agree With{' '}
              <Text style={{color: '#7EBB4F'}}>Terms and Conditions</Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity style={stlyes.loginButton} onPress={handleRegister}>
          {isLoading ? (
            <ActivityIndicator
              size={'large'}
              color={'white'}
              style={{marginTop: 6}}
            />
          ) : (
            <Text style={stlyes.loginText}>Register</Text>
          )}
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Text>Already have an Account ?</Text>
          <Text
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={{color: '#7EBB4F'}}>
            Login
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
    marginTop: 210,
    backgroundColor: '#7EBB4F',
    height: 48,
    borderRadius: 5,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 140,
    marginTop: 12,
  },
});
