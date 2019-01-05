import React from 'react';
import { createStackNavigator,createSwitchNavigator } from 'react-navigation';

// import screens
import AppStack from './App/Components/AppStack';
import SignInScreen from './App/Components/AuthScreen/SignInScreen';
import AuthLoadingScreen from './App/Components/AuthScreen/AuthLoadingScreen';

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
