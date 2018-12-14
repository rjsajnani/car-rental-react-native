import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import CarsScreen from './App/Components/Cars';
import BookingScreen from './App/Components/Cars/Booking'
import { Color } from './App/Style/Color';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}
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
    Home: { screen: HomeScreen },
    Cars:  CarsStack,
    Settings: { screen: SettingsScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        }else if(routeName === 'Cars'){
          iconName = `car`;
        } else if (routeName === 'Settings') {
          iconName = `cog`;
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