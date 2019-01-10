import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import CarsScreen from '../Cars';
import Home from '../Home'
import BookingScreen from '../Cars/Booking'
import { Color } from '../../Style/Color';

const CarsStack = createStackNavigator({
  Cars: CarsScreen,
  Booking: BookingScreen,
});

const HomeStack = createStackNavigator({
  Home: Home,
  Booking: BookingScreen,
});

CarsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};


const AppStack = createBottomTabNavigator(
  {
    Home:{
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'home'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Cars:  {
      screen: CarsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'car'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Color.primary,
      inactiveTintColor: 'gray',
    },
  }
);

export default AppStack