// AppNavigator.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../types/types';

import AuthNavigator from '../pages/auth/AuthNavigator';
import FrontEndNavigator from '../pages/FrontEndNavigator';

export default function AppNavigator() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <FrontEndNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
