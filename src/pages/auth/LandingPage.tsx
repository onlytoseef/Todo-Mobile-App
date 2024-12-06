import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Taski from '../../assets/images/taski.svg';
import Group from '../../assets/images/Group.svg';
import {useNavigation} from '@react-navigation/native';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Taski style={styles.image} />
      <Group style={styles.image1} />
      <View style={{marginTop: 70}}>
        <Text style={styles.heading1}>Start With Taski</Text>
        <Text style={styles.heading2}>
          Join us now and get your daily things
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 40,
  },
  image1: {
    marginTop: 100,
  },
  heading1: {
    color: '#0B0A11',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  heading2: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 30,
  },
  loginButton: {
    backgroundColor: '#7EBB4F',
    width: 335,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  registerText: {
    color: '#7EBB4F',
    fontWeight: '700',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: 'transparent',
    width: 335,
    height: 50,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#7EBB4F',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LandingPage;
