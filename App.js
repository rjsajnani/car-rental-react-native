import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
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
    Cars:  CarsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if(routeName === 'Cars'){
          iconName = `car`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    initialRouteName:'Cars',
    tabBarOptions: {
      activeTintColor: Color.primary,
      inactiveTintColor: 'gray',
    },
  }
);