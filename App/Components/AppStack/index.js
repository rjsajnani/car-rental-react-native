import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import CarsScreen from '../Cars';
import BookingScreen from '../Cars/Booking'
import { Color } from '../../Style/Color';

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


const AppStack = createBottomTabNavigator(
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

export default AppStack