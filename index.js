/** @format */
import React from 'react'
import {AppRegistry,SafeAreaView} from 'react-native';
import App from './App';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';
import { Color } from './App/Style/Color';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.primary,
  }
};


export default function Main() {
    return (
      <PaperProvider theme={theme}>
          <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
