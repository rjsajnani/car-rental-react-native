/** @format */
import React from 'react'
import {AppRegistry,View, Text} from 'react-native';
import App from './App';
import { Provider as StoreProvider } from 'react-redux'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';
import { Color } from './App/Style/Color';
import { store } from './App/redux/app-redux';

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
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
      </StoreProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
