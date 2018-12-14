import React,{Fragment,Component} from 'react';
import {View,Text,SafeAreaView,Dimensions,StyleSheet} from 'react-native';
import { Appbar } from 'react-native-paper';
import {Color} from '../../Style/Color';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import CarList from './CarsList';
import ReservationList from './ReservationList'
const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

export default class MyComponent extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Book a Car' },
      { key: 'second', title: 'Reservations' },
    ],
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Car',
      headerStyle: {
        backgroundColor: Color.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };
  _renderTabBar = props => {
    return (
      <View>
        <TabBar
          {...props}
        />
      </View>
     
    );
  };
  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return  <CarList navigation={this.props.navigation} />;
      case 'second':
        return <ReservationList />;
      default:
        return null;
    }
  }
    render() {
      return (
        <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
      );
    }
  }


  const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
  });