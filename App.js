import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import CarsScreen from './App/Components/Cars';
import BookingScreen from './App/Components/Cars/Booking'
import { Color } from './App/Style/Color';




const CarsStack = createStackNavigator({
  Cars: CarsScreen,
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


export default createBottomTabNavigator(
  {
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